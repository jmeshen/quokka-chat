'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        ref: 'User'
    }
})

schema.methods.createChild = function(reply, cb) {
    var Comment = mongoose.model('Comment');

    var response = new Comment({
        parent: this._id,
        user: reply.userId,
        content: reply.content
    });

    console.log(response);

    response.save(cb);
}

// schema.pre('save', function(next) {
//     next();
// })

mongoose.model('Comment', schema)