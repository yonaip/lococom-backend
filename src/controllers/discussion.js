"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const DiscussionModel = require('../models/discussion');

const createDiscussion = async (req,res) => {
  const newDiscussion = new DiscussionModel(req.body);

  newDiscussion.save()
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(400).send(`Could not create ${newDiscussion} due to ${err}`);
    });
}

const getDiscussion = async (req,res) => {
  try {
    const discussion = await DiscussionModel.findById(req.params.id).exec();
    
    if (!discussion) return res.status(404).json({
        error: 'Not Found',
        message: `Discussion ${req.params.id} not found`
    });

    return res.send(discussion);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
}
const getDiscussionProfile = async (req,res) => {
  try {
    const discussions = await DiscussionModel.find({username: req.params.id}).exec();
    
    if (!discussions) return res.status(404).json({
        error: 'Not Found',
        message: `Discussions for User ${req.params.id} not found`
    });

    return res.send(discussions);
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
    createDiscussion,
    getDiscussion,
    getAllDiscussions,
    upvote,
    downvote,
    getDiscussionProfile,
    
};