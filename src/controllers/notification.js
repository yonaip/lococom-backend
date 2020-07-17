"use strict";

const NotificationModel = require('../models/notification');
const UserModel = require("../models/user");

/** Creates a notification for a user, it's not bound to an endpoint as notifications are created internally
 * 
 * @param {*} userId 
 * @param {*} type
 * @param {*} message
 * @param {*} read
 */
const createNotification = async (userId, type, message, read) => {
  try {
    const newNotification = await new NotificationModel({
      userId: userId,
      type: type,
      message: message,
      read: read
    }).save();
    
  } catch(err) {
    res.status(400).send(`Could not create notification due to ${err}`);
  }   
}

/** Returns all notifications
 *  TODO: possibly add query params
 * @param {*} req 
 * @param {*} res 
 */
const getNotifications = async (req,res) => {
    try {
      const notifications = await NotificationModel.find({userId: req.userId}).exec();

      return res.send(notifications);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
  }

const deleteNotification = async (req,res) => {
  try {
    const notification = await NotificationModel.findById(req.params.id).exec();
    if(notification && req.userId != notification.userId) {
      return res.status(404).json({
        error: 'Not Authorized',
        message: `Notification does not own ${req.params.id}`
    });
    }

    await NotificationModel.findByIdAndDelete(req.params.id).exec();

    if (!notification) return res.status(404).json({
        error: 'Not Found',
        message: `Notification for User ${req.params.id} not found`
    });

    return res.send(notification);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
}

/** Gets all discussion
 *  TODO: refactor to use query parameters to limit search radius
 *  important for very big collections
 * @param {*} req 
 * @param {*} res 
 */
const getAllDiscussions = async (req,res) => {
  try {
    const discussions = await DiscussionModel.find().exec();
    return res.send(discussions);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
}

const upvote = async(req,res) => {

  try {
    const discussion = await DiscussionModel.findById(req.params.id).exec();
    if (!discussion) return res.status(404).json({
        error: 'Not Found',
        message: `Discussion ${req.params.id} not found`
    });
    await DiscussionModel.updateOne({_id:req.params.id}, {$inc: {votes : 1}} )
    return res.send(discussion);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
}

const downvote = async(req,res) => {

  try {
    const discussion = await DiscussionModel.findById(req.params.id).exec();
    if (!discussion) return res.status(404).json({
        error: 'Not Found',
        message: `Discussion ${req.params.id} not found`
    });
    await DiscussionModel.updateOne({_id:req.params.id}, {$inc: {votes : -1}} )
    return res.send(discussion);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
}

module.exports = {
    createNotification,
    getNotifications,
    deleteNotification
};