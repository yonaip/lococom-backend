"use strict";

const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
});

ChatSchema.set('versionKey', false);

// Export use model
module.exports = mongoose.model('Discussion', ChatSchema);