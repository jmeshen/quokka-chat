'use strict'
var request = require('request');
var cheerio = require('cheerio');
var router = require('express').Router();
module.exports = router;
// var _ = require('lodash');
var mongoose = require('mongoose');
var Video = mongoose.model('Video');
var Promise = require('bluebird');
// var deepPopulate = require('mongoose-deep-populate');

function scrape(url, searchItem) {
    return new Promise(function(resolve, reject) {
        request.get(url, function(err, response) {
            if (err) {
                console.log('scraping err', err);
                reject(err);
            } else {
                var $ = cheerio.load(response.body);
                var item = $(searchItem).text().trim();
                resolve(item);
            }
        })
    })

}

function getVideoInfo(url) {
    var titleP = scrape(url, '#eow-title');
    var descriptionP = scrape(url, '#eow-description');
    return Promise.all([titleP, descriptionP]);
}

// getVideoInfo('https://www.youtube.com/watch?v=YkoiTA3EqCM').then(function(info) {
//     console.log(info);
// })

function hasAdminPower(req, res, next) {
    if (req.user.powerLevel === 'admin') next();
    else res.status(403).end();
}

router.get('/', function(req, res) {
    Video.find({}).exec().then(function(videos) {
        res.json(videos);
    }, function(err) {
        console.log(err);
    })
});

router.get('/:videoId', function(req, res) {
    Video.findOne({
        _id: req.params.videoId
    }).populate('comments').deepPopulate('comments.user').exec().then(function(video) {
        res.json(video);
    }, function(err) {
        console.log(err);
    })
});

router.get('/tag/:tag', function(req, res) {

    Video.find({
        tags: {
            $elemMatch: {
                text: req.params.tag
            }
        }
    }).exec().then(function(videos) {
        res.json(videos);
    }, function(err) {
        console.log(err);
    })
})

router.get('/embedid/:embedId', function(req, res) {
    Video.findOne({
        embedId: req.params.embedId
    }).exec().then(function(video) {
        res.json(video);
    }, function(err) {
        console.log(err);
    })
})

router.post('/', function(req, res) {
    var url = req.body.url;
    getVideoInfo(url).then(function(info) {
        var body = {
            tags: req.body.tags,
            name: info[0],
            description: info[1],
            url: url,
            embedId: req.body.embedId
        }
        var video = new Video(body);
        video.save(function(err, vid) {
            if (err) console.log(err);
            res.json(vid);
        })
    })
})

router.put('/:id', function(req, res, next) {
    Video.findById(req.params.id)
        .exec()
        .then(function(video) {
            video.comments.push(req.body._id);
            return video.save();
        })
        .then(function(video) {
            console.log('saved', video);
            return Video.populate(video, {
                path: 'comments'
            })
        })
        .then(function(video) {
            console.log('pop', video)
            res.json(video);
        })
        .then(null, next);
});

router.delete('/remove/:id', hasAdminPower, function(req, res, next) {
    Video.findByIdAndRemove(req.params.id).exec()
        .then(function() {
            res.status(204).send();
        }).then(null, next);
})