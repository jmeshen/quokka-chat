'use strict'
var request = require('request');
var cheerio = require('cheerio');
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Video = mongoose.model('Video');

router.get('/', function(req, res, error) {
    Video.find({}).exec().then(function(videos) {
        res.json(videos);
    }, error = function(err) {
        console.log(err);
    })
});

router.get('/:videoId', function(req, res, error) {
    Video.findOneById(req.params.id).exec().then(function(video) {
        res.json(video);
    }, error = function(err) {
        console.log(err);
    })
});

router.post('/', function(req, res, error) {
    var video = new Video(req.body);
    video.save(function(err, video) {
        if (err) console.log(err);
        res.json(video);
    })
})