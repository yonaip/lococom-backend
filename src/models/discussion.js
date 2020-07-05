"use strict";

const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true, 
    },
    votes: {
        type: Number,
        required:true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    }
});

DiscussionSchema.set('versionKey', false);

// Export use model
module.exports = mongoose.model('Discussion', DiscussionSchema);