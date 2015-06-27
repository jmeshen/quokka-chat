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
    console.log('hitting video/:videoId route')
    console.log('req.params.videoId', req.params.videoId)
    Video.findOne({_id: req.params.videoId}).exec().then(function(video) {
        console.log('getting video from db', video)
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