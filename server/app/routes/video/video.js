'use strict'
var request = require('request');
var cheerio = require('cheerio');
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Video = mongoose.model('Video');

router.get('/', function(req, res) {
    Video.find({}).exec().then(function(videos) {
        res.json(videos);
    }, function(err) {
        console.log(err);
    })
});

router.get('/:videoId', function(req, res) {
    Video.findOneById(req.params.id).exec().then(function(video) {
        res.json(video);
    }, function(err) {
        console.log(err);
    })
});

router.post('/', function(req, res) {
    var video = new Video(req.body);
    video.save(function(err, vid) {
        if (err) console.log(err);
        res.json(vid);
    })
})