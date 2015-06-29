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
        type: String
    }],
    commentTime: {
        type: Date,
        default: Date
    }
})

schema.method.createChild = function(reply) {
    this.child = new Comment()
    this.child = this.child._id
    this.child.user = reply.user
    this.child.content = reply.content
}

// schema.pre('save', function(next) {
//     next();
// })

mongoose.model('Comment', schema)