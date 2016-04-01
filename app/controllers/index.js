"use strict"

const express = require('express');
const router = express.Router();

//router.use('/users', require('./users'))
//router.use('/services', require('./services'))

router.get('/', function(req, res) {
    res.render('home', { 'section': 'Home', 'title': 'Kong UI'
        //, 'user':{
        //'email':'sauraviit@gmail.com'
        //
        //}
    });
})


router.get('/login',function(req, res){
    console.log(__dirname)
    res.sendfile('login.html', { root: __dirname + "/../public" } );
})

module.exports = router