"use strict";

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true, 
    },
    votes: {
        type: Number,
    },
    discussionId: {
        type: String,
    },
});

CommentSchema.set('versionKey', false);

// Export use model
module.exports = mongoose.model('Comment', CommentSchema);