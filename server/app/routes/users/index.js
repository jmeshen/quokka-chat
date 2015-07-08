'use strict'
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Promise = require('bluebird')

function hasAdminPower(req, res, next) {
    if (req.user.powerLevel === 'admin') next();
    else res.status(403).end();
}

// get users by email
router.get('/userEmail/:email', hasAdminPower, function(req, res, next) {

    User.findOne({
        email: req.params.email
    }).exec().then(function(user) {
        res.json(_.omit(user.toJSON(), ['password', 'salt']));
    })
        .then(null, next);
});

router.get('/:userID', function(req, res, next) {
    User.find({
        _id: req.params.userID
    }).exec().then(function(user) {
        res.json(user);
    }).then(null, next);
});

// A PUT route is created to promote users to admin status
router.put('/promote/:id', hasAdminPower, function(req, res, next) {
    console.log('this hits the put route!', req.params.id);
    User.findById(req.params.id).exec()
        .then(function(user) {
            console.log('do you enter this function?', req.body.powerLevel);
            user.powerLevel = req.body.powerLevel;
            return user.save(function(user) {
                res.status(201).end();
            });
        })
        .then(null, next);
});