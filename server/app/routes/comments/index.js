'use strict'
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Comments = mongoose.model('Comments');

router.get('/', function(req, res, error) {
    var modelParams = {}
    if (req.query.videoId) modelParams.video_id = req.query.videoId;
    if (req.query.userId) modelParams.user_id = req.query.userId;
    if (req.query.tags) modelParams.tags = req.query.tags;

    Comments.find(modelParams).then(function(comments) {
        res.json(comments);
    })

}, error = function(err) {
    console.log('failed to find comments');
})

router.post('/:videoId', function(req, res, error) {
        var comment = new Comments(req.body);
        comment.save(function(err) {
            if (err) console.log(err);
            res.status(200).send(comment);
        })
    }
})

router.put('/', function(req, res, error) {
    Comments.findOneAndUpdate(req.body._id, req.body, function(err, comment) {
        if (err) console.log(err);
        res.json(comment);
    })
});