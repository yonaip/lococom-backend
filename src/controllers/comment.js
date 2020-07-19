"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');

const CommentModel = require('../models/comment');
const DiscussionModel = require('../models/discussion');

const NotificationController = require('./notification');
const cookieParser = require('cookie-parser');


// creates a new Comment in the database
const createComment = async (req, res) => {
  try {
    const { creatorId, title } = await DiscussionModel.findById(req.body.discussionId);

    const newComment = await new CommentModel({
      username: req.body.username,
      userId: req.userId,
      content: req.body.content,
      votes: req.body.votes,
      discussionId: req.body.discussionId,
      timestamp : req.body.timestamp
    }).save();

    // if user is different from creator of discussion send notification
    if (req.userId != creatorId) {
      NotificationController.createNotification(creatorId, "comm_create", `"${req.body.username}" commented on ${title}!`);
    }

    res.send(newComment);
  } catch (err) {
    res.status(500).send(`Could not create comment due to ${err}`);
  }
}


// gets all Comments from a discussion
const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find({ discussionId: req.params.id }).exec();
    if (!comments) return res.status(404).json({
      error: 'Not Found',
      message: `Comments ${req.params.id} not found`
    });

    return res.send(comments);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  }

}

const upvote = async (req, res) => {

  try {
    const comment = await CommentModel.findById(req.params.id).exec();
    if (!comment) return res.status(404).json({
      error: 'Not Found',
      message: `Discussion ${req.params.id} not found`
    });
    await CommentModel.updateOne({ _id: req.params.id }, { $inc: { votes: 1 } })
    return res.send(comment);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  }
}

const downvote = async (req, res) => {

  try {
    const comment = await CommentModel.findById(req.params.id).exec();
    if (!comment) return res.status(404).json({
      error: 'Not Found',
      message: `Discussion ${req.params.id} not found`
    });
    await CommentModel.updateOne({ _id: req.params.id }, { $inc: { votes: -1 } })
    return res.send(comment);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  }
}

// gets all Comments from a User
const CommentProfile = async (req, res) => {
  try {
    const comments = await CommentModel.find({ username: req.params.id }).exec();

    if (!comments) return res.status(404).json({
      error: 'Not Found',
      message: `Comments for User ${req.params.id} not found`
    });

    return res.send(comments);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  }
}


// deletes a Comment
const deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findOne({ _id: req.params.id }).exec(); 
    if (!comment) return res.status(404).json({
      error: 'Not Found',
      message: `Comment ${req.params.id} not found`
    });
    await CommentModel.deleteOne({_id : req.params.id})
      res.send(comment)

  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });

  }}

  module.exports = {
    createComment,
    getComments,
    upvote,
    downvote,
    CommentProfile,
    deleteComment
  };