"use strict";

const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
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
    timestamp: {
        type: String,
    },

    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}], //can be deleted
    upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    downvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

DiscussionSchema.set('versionKey', false);

// Export use model
module.exports = mongoose.model('Discussion', DiscussionSchema);