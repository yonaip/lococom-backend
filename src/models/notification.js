"use strict";

const mongoose = require('mongoose');
/**
 * @userId - user who should receive the notification
 * @type 
 *  - comment - new Comment in discussion
 *  - upvote - upvote on comment or discussion
 *  - friendsRequest - friends request recieved
 * @message - message for notification
 * @read - whether the user has seen the notification
 */
const NotificationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    type: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        reqired: true
    },
});

NotificationSchema.set('versionKey', false);

// Export use model
module.exports = mongoose.model('Notification', NotificationSchema);