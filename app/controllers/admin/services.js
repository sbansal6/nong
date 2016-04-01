"use strict"

const express = require('express');
const router = express.Router();
const Service = require('../../models/Service');

router.get('/', function(req, res, next) {
    Service.find({}, function(err, docs) {
        if (err) next(err);
        res.render('admin/services', { 'section': 'Services', 'title': 'Link unlink micro-services', 'services': docs });
    });
});

router.get('/add', function(req, res, next) {
    res.render('admin/services/service', { 'section': 'Services', 'title': 'Add Service' });
});

router.post('/add', function(req, res, next) {
    if (!req.body.hasOwnProperty("active")) {
        req.body.active = false;
    }
    var s = new Service(req.body)
    s.save(function (err, s) {
        if (err) next(err);
        res.redirect('/admin/services');
    });
});

router.get('/:id', function(req, res, next) {
    Service.findOne({ "_id": req.params.id }, function(err, doc) {
        if (err) next(err);
        res.render('admin/services/service', { 'section': 'Services', 'title': 'Edit Service', 'service': doc });
    });
});

router.post('/:id', function(req, res, next) {
    if (!req.body.hasOwnProperty("active")) {
        req.body.active = false;
    }
    Service.findOneAndUpdate({ "_id": req.body.id }, req.body, function(err, doc) {
        if (err) next(err);
        res.redirect('/admin/services');
    });
});

module.exports = router;