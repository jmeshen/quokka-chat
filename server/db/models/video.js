var mongoose = require('mongoose')
var deepPopulate = require('mongoose-deep-populate')

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },
    embedId: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    moderators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: String
    },
    tags: [{
        text: {
            type: String
        }
    }]
});

schema.plugin(deepPopulate, {
    populate: {
        "comments.user": {}
    }
})

mongoose.model('Video', schema);