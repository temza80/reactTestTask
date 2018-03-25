'use strict'
var express = require('express');
var router = express.Router();
var mongoose    = require('mongoose');
var Data= require('./mongoose').DataModel;
router.post('/save', function(req, res, next) {


    var data = new Data({
        dataStr: JSON.stringify(req.body.state)
    });
    data.save(function(err) {
        if (err) console.log(err.message);
        else res.json({
            answer: "ok"
        })
    })


})

router.get('/getall', function(req, res, next) {
    Data.findOne().sort('-modified').exec(function(err, item) {
        if (err) console.log(err.message);
        
        if(item) res.json(item.dataStr)
    });

})




module.exports = router;

