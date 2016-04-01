"use strict"

const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/', function(req, res, next) {
    User.find({}, function(err, docs) {
        if (err) next(err);
        res.render('admin/users', { 'section': 'Users', 'title': 'Manage Users', 'users': docs });
    });
});

router.get('/add', function(req, res, next) {
    res.render('admin/users/user', { 'section': 'Users', 'title': 'Add User' });
});

router.post('/add', function(req, res, next) {
    if (!req.body.hasOwnProperty("revoked")) {
        req.body.revoked = false;
    }
    var u = new User(req.body)
    u.save(function (err, u) {
        if (err) {
            res.render('admin/users/user', { 'section': 'Users', 'title': 'Add User', 'error': err });
        } else {
            res.redirect('/admin/users');
        }
    });
});

router.get('/:id', function(req, res, next) {
    User.findOne({ "_id": req.params.id}, function(err, doc) {
        if (err) next(err);
        res.render('admin/users/user', { 'section': 'Users', 'title': 'Edit User', 'user': doc });
    });
});

router.post('/:id', function(req, res, next) {
    if (!req.body.hasOwnProperty("revoked")) {
        req.body.revoked = false;
    }
    User.findOneAndUpdate({ "_id": req.body.id }, req.body, { "runValidators": true },  function(err, doc) {
        if (err) {
            res.render('admin/users/user', { 'section': 'Users', 'title': 'Add User', 'user': doc , 'error': err });
        } else {
            res.redirect('/admin/users');
        }
    });
});

module.exports = router;


