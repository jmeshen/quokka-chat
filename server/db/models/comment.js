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
    }.
    videoUrl: {
        type: String,
        required: true
    },
    tags: [{
        type: string
    }]
})

schema.method.addChild = function(reply) {
    reply.parent = this._id
}

schema.pre('save', function(next) {
    this.date = Date.now()
})

mongoose.model('Comments', schema)