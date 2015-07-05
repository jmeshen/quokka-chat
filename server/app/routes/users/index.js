'use strict'
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird')

router.get('/:userID', function(req, res) {
    User.find({
        _id: req.params.userID
    }).exec().then(function(user) {
        res.json(user);
    }, function(err) {
        console.log(err);
    })
});