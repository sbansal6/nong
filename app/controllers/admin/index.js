"use strict"

const express = require('express');
const router = express.Router();

router.use('/users', require('./users'))
router.use('/services', require('./services'))

router.get('/', function(req, res) {
    res.render('admin/home', { 'section': 'Home', 'title': 'Welcome to Marin API Gateway' });
})

module.exports = router