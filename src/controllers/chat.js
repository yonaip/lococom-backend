"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');

const ChatModel = require('../models/chat');
const UserModel = require('../models/user');
const CommentModel = require('../models/comment');

const NotificationController = require('./notification');
const comment = require('../models/comment');

const createChat = async (userId1, userId2) => {
    try {
        const newChat = await new ChatModel({
            participants: [userId1, userId2]
        }).save();

    } catch (err) {
        console.log(`Could not create chat due to ${err}`);
    }
}

const removeChat = async (userId1, userId2) => {
    try {
        const oldChat = await ChatModel.findOneAndRemove({ participants: { $all: [userId1, userId2] } }).exec();
    } catch (err) {
        console.log(`Could not create chat due to ${err}`);
    }
}

const getChat = async (req, res) => {
    try {
        const otherUser = await UserModel.findOne({username: req.params.id }).exec();
        const chat = await ChatModel.findOne({ participants: { $all: [req.userId, otherUser._id] } });
        
        res.send(chat);
    } catch (err) {
        console.log(`Could not create chat due to ${err}`);
    }
}

const getChatComments = async (req, res) => {
    try {
        const otherUser = await UserModel.findOne({username: req.params.id }).exec();
        let {comments} = await ChatModel.findOne({ participants: { $all: [req.userId, otherUser._id] } });
        
        const result = [];
        for(const id of comments) {
            result.push(await CommentModel.findById(id));
        }

        res.send(result);
    } catch (err) {
        console.log(`Could not create chat due to ${err}`);
    }
}

const postChatComment = async (req, res) => {
    try {
        const otherUser = await UserModel.findOne({username: req.params.id }).exec();
        let chat = await ChatModel.findOne({ participants: { $all: [req.userId, otherUser._id] } });
        
        req.body.userId = req.userId;
        const comment = await new CommentModel(req.body).save();
        chat = await ChatModel.findByIdAndUpdate(chat.id, { $push: { comments: comment._id } });

        res.send(chat);
    } catch (err) {
        console.log(`Could not create chat due to ${err}`);
    }
}

module.exports = {
    createChat,
    removeChat,
    getChat,
    getChatComments,
    postChatComment
};