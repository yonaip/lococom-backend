"use strict";

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }, 
    email: {
        type: String
    },
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }]
});

UserSchema.set('versionKey', false);

// Export use model
module.exports = mongoose.model('User', UserSchema);