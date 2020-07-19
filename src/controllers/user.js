"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');

const ChatController = require('./chat');

const getUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.params.id }).exec();
        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `User ${req.params.id} not found`
        });

        return res.send(user);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }

}
const getUserfromId = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.params.id }).exec();
        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `User ${req.params.id} not found`
        });

        return res.send(user);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
}

const addFriend = async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.userId).exec();
        const targetUser = await UserModel.findOne({username: req.params.id}).exec();

        if(targetUser._id == req.userId) {
            res.status(400).send(`Can't be friends with yourself!`);
        }

        if(currentUser.friendlist.includes(targetUser._id) || targetUser.friendlist.includes(currentUser._id)) {
            res.status(400).send(`Already friends! with ${targetUser.username}`);
        }

        const response = [
            await UserModel.findByIdAndUpdate(currentUser._id, { $push: { friendlist: targetUser._id } }).exec(),
            await UserModel.findByIdAndUpdate(targetUser._id, { $push: { friendlist: currentUser._id } }).exec()
        ];

        // Create their chat
        await ChatController.createChat(currentUser._id, targetUser._id);

        res.send(response);

    } catch (err) {
        res.status(400).send(`Could not add ${req.params.id} due to ${err}`);
    }
}
const deleteFriend = async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.userId).exec();
        const targetUser = await UserModel.findOne({username: req.params.id}).exec();
        
        if(targetUser._id == req.userId) {
            res.status(400).send(`Can't be friends with yourself!`);
        }

        if(!currentUser.friendlist.includes(targetUser._id) || !targetUser.friendlist.includes(currentUser._id)) {
            res.status(400).send(`Not friends with ${targetUser.username}`);
        }

        const response = [
            await UserModel.findByIdAndUpdate(currentUser._id, { $pull: { friendlist: targetUser._id } }).exec(),
            await UserModel.findByIdAndUpdate(targetUser._id, { $pull: { friendlist: currentUser._id } }).exec()
        ];

        // Remove their chat
        await ChatController.removeChat(currentUser._id, targetUser._id);

        res.send(response);

    } catch (err) {
        res.status(400).send(`Could not remove ${req.params.id} due to ${err}`);
    }
}
module.exports = {
    getUser,
    addFriend,
    getUserfromId,
    deleteFriend
};