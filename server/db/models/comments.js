'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    username: {
        type: String,
    },

    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    videoTime: {
        type: Number
    },
    tags: [{
        text: {
            type: String
        }
    }],
    commentTime: {
        type: Date,
        default: Date
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
})

schema.pre('save', function(next) {
    this.videoTime = Math.floor(this.videoTime)
    next()
})

schema.methods.createChild = function(reply, cb) {
    var Comment = this.constructor;

    var response = new Comment({
        parent: this._id,
        user: reply.userId,
        username: reply.username,
        content: reply.content
    });

    console.log(response);

    if (cb) response.save(cb);
    else return response.save();
}

// schema.pre('save', function(next) {
//     next();
// })

mongoose.model('Comment', schema)