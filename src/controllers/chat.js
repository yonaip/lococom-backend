"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');

const ChatModel = require('../models/comment');
const CommentModel = require('../models/discussion');
const UserModel = require('../models/user');

const NotificationController = require('./notification');

const createChat = async(userId1, userId2) => {

}

const getChat = async(req, res) => {
}

module.exports = {
    getChat,
    getChatComments,
    postChatComment
};