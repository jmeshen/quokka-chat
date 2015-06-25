var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    owner: {
        type: String
    }
});

mongoose.model('Video', schema);