'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    video: {
        url: {
            type: String
        },
        time: {
            type: Number
        }
    },
    tags: [{
        type: String
    }]
})

schema.method.createChild = function(reply) {
    this.child = new Comment()
    this.child = this.child._id
    this.child.user = reply.user
    this.child.content = reply.content
}

schema.pre('save', function(next) {
    this.date = Date.now()
})

mongoose.model('Comment', schema)