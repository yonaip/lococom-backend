"use strict";

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true, 
    },
    votes: {
        type: Number,
        required: true,
    },
    discussionId: {
        type: String,
        required: true,
    },
});

CommentSchema.set('versionKey', false);

// Export use model
module.exports = mongoose.model('Comment', CommentSchema);