"use strict";

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.set('versionKey', false);

// Export use model
module.exports = mongoose.model('User', UserSchema);