"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const CommentModel = require('../models/comment');

const createComment = async (req,res) => {
  var newComment = new CommentModel(req.body);
  newComment.save()
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(400).send(`Could not create ${newComment} due to ${err}`);
    });
 }

const getComments = async (req,res) => {
 try {
    const comments = await CommentModel.find({discussionId: req.params.id}).exec();
    if (!comments) return res.status(404).json({
        error: 'Not Found',
        message: `Comments ${req.params.id} not found`
    });

    return res.send(comments);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
 
}
    
const upvote = async(req,res) => {

  try {
    const comment = await CommentModel.findById(req.params.id).exec();
    if (!comment) return res.status(404).json({
        error: 'Not Found',
        message: `Discussion ${req.params.id} not found`
    });
    await CommentModel.updateOne({_id:req.params.id}, {$inc: {votes : 1}} )
    return res.send(comment);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
}

const downvote = async(req,res) => {

  try {
    const comment = await CommentModel.findById(req.params.id).exec();
    if (!comment) return res.status(404).json({
        error: 'Not Found',
        message: `Discussion ${req.params.id} not found`
    });
    await CommentModel.updateOne({_id:req.params.id}, {$inc: {votes : -1}} )
    return res.send(comment);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
}
 
const getCommentProfile = async (req,res) => {
  try {
    const comments = await CommentModel.find({username: req.params.id}).exec();
    
    if (!comments) return res.status(404).json({
        error: 'Not Found',
        message: `Comments for User ${req.params.id} not found`
    });

    return res.send(comments);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
}




module.exports = {
    createComment,
    getComments,
    upvote,
    downvote,
    getCommentProfile
};