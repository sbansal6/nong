"use strict"

const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars')
const path = require('path');
const express = require('express');
const session = require('express-session');
const moment = require('moment');

module.exports = function(app) {

    // set up handlebars view engine
    var handlebars = expressHandlebars.create({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, "../app/views/layouts"),
        partialsDir: path.join(__dirname, "../app/views/partials"),
        helpers: {
            formatDate: function(date) {
                return moment.utc(date).format("YYYY-MM-DD HH:mm:ss")
            }, 
            math: function(lvalue, operator, rvalue, options) {
                lvalue = parseFloat(lvalue);
                rvalue = parseFloat(rvalue);
                  
                return {
                    "+": lvalue + rvalue,
                    "-": lvalue - rvalue,
                    "*": lvalue * rvalue,
                    "/": lvalue / rvalue,
                    "%": lvalue % rvalue
                }[operator];
            },
            if_eq: function(v1, v2, options) {
                if(v1 === v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            },    
            unless_eq: function(v1, v2, options) {
                if(v1 === v2) {
                    return options.inverse(this);
                }
                return options.fn(this);
            }
        }
    });
    app.engine('handlebars', handlebars.engine);
    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'handlebars');

    app.use(session({
        secret: "cscascas",
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));
    app.set("port", process.env.PORT || 5000);
    app.all("/*", function(req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*");
        // restrict it to the required domain
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        // Set custom headers for CORS
        res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");
        if (req.method == "OPTIONS") {
            res.status(200).end();
        } else {
            next();
        }
    });
    app.use(bodyParser.json());
    app.set('json spaces', 4);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.disable('x-powered-by');
    app.use(express.static(path.join(__dirname, '../api/public')));
}