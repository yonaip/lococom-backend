"use strict";

const mongoose = require('mongoose');

const friendListSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    friends: [{
        type: 'String'
      }]
});

friendListSchema.set('versionKey', false);

// Export use model
module.exports = mongoose.model('Friendlist', friendListSchema);