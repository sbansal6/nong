"use strict"
var appAuthenticator = require("app-authenticator");
var models  = require("../models");
var httpErrors = require("httperrors");
var mongoose = require("mongoose");

/**
 * Encode Email (mimic how acl module does it)
 * @param text
 * @returns {*}
 */
function encodeText(text) {
    if (typeof text == "string" || text instanceof String) {
        text = encodeURIComponent(text);
        text = text.replace(/\./g, "%2E");
    }
    return text;
}

/**
 * addUpdateUser:-
 *     inserts a new records, set default role to viewer
 *     update token if user already exists
 * @param email
 * @param cb
 */
function addUpdateUser(email, cb){
    models.User.findOne({email: email}, function(err, user){
        if(err){
            return cb(err);
        } else {
            if (user){
                user.save(cb);
            } else {
                // add new user
                // set default role to viewer
                var newUser  = new models.User({email:email});
                var newAclUser = new models.AclUser({key:encodeText(email),viewer:true});
                newAclUser.save(newUser.save(cb));
            }
        }
    });
};

/**
 * Accepts email and password as request headers and return authentication token
 * @param req
 * @param res
 * @param next
 */
function POST(req,res,next) {
    var email = req.body.email;
    var password = req.body.password;
    appAuthenticator.isAuthenticated(email, password, function(err, isAuthenticated){
        if (err){
            return next(new httpErrors.InternalServerError());
        } else {
            if (isAuthenticated === "false"){
                return next(new httpErrors.Forbidden("invalid credentials"));
            }
            else {
                addUpdateUser(email, function(err, user){
                    if(err){
                        return next(new httpErrors.InternalServerError());
                    } else {
                        res.json({
                            data: {
                                email: user.email,
                                token: user.token
                            }
                        });
                    }
                });
            }
        }
    });
}


module.exports.POST = POST;
