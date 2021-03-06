'use strict'
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.get('/', function(req, res) {
    var modelParams = {}
    if (req.query.videoId) modelParams.video_id = req.query.videoId;
    if (req.query.userId) modelParams.user_id = req.query.userId;
    if (req.query.tags) modelParams.tags = req.query.tags;

    Comment.find(modelParams).then(function(comments) {
        res.json(comments);
    })

}, function(err) {
    console.log('failed to find comments', err);
})

router.get('/:parentId/response/', function(req, res, next) {
    Comment.find({
        parent: req.params.parentId
    }).populate('user').exec(function(err, comments) {
        if (err) return handleError(err);
    }).then(function(comments) {
        res.json(comments);
    })
})

router.post('/', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) return next(err);
        res.status(200).send(comment);
    })
})

router.post('/:parentId/response/', function(req, res, next) {
    Comment.findById(req.params.parentId, function(err, comment) {
        if (err) return next(err);
        comment.createChild(req.body, function(err, child) {
            if (err) return next(err);
            res.json(child);
        });
    })
})

router.put('/:commentId', function(req, res, next) {
    Comment.findById(req.params.commentId, function(err, comment) {
        if (err) return next(err);
        comment.rating = req.body.rating;
        comment.save(function(err, updatedComment) {
            res.json(updatedComment);
        });
    })
});

router.delete('/delete/:commentId', function(req, res, next) {
    Comment.findById(req.params.commentId).exec()
        .then(function(comment) {
            comment.remove();
            res.status(204).send();
        }).then(null, next);
})