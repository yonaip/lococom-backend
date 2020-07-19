"use strict";

const DiscussionModel = require('../models/discussion');
const UserModel = require("../models/user");
const NotificationController = require('./notification');

// gets a Discussion Object from an ID

const getDiscussion = async (req, res) => {
  try {
    const discussion = await DiscussionModel.findById(req.params.id).exec();

    if (!discussion) return res.status(404).json({
      error: 'Not Found',
      message: `Discussion ${req.params.id} not found`
    });

    return res.send(discussion);
  } catch (err) {
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
const getAllDiscussions = async (req, res) => {
  try {
      if(req.query.topic) {
          const discussions = await DiscussionModel.find({topic: {$in: req.query.topic.split(',')}}).exec();
          return res.send(discussions);
      }
      else {
          const discussions = await DiscussionModel.find().exec();
          return res.send(discussions);
      }
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
}

/** Creates a discussion
 * 
 * @param {*} req 
 * @param {*} res 
 */
const createDiscussion = async (req, res) => {
  // Set the creatorId
  req.body.creatorId = req.userId;

  try {
    const newDiscussion = await new DiscussionModel(req.body).save();

    await UserModel.updateOne({ _id: req.userId }, {
      $push: { discussions: newDiscussion._id }
    });

    res.send(newDiscussion);

  } catch (err) {
    res.status(400).send(`Could not create ${newDiscussion} due to ${err}`);
  }

}

/** Upvotes a discussion, idempotent
 *  Sends a notification to the creator of the discussion
 * @param {*} req 
 * @param {*} res 
 */
const upvoteDiscussion = async (req, res) => {
  try {
    const discussion = await DiscussionModel.findById(req.params.id).exec();
    if (!discussion) return res.status(404).json({
      error: 'Not Found',
      message: `Discussion ${req.params.id} not found`
    });

    let upvoters = discussion.upvoters;
    let downvoters = discussion.downvoters;

    if (!upvoters.includes(req.userId)) {
      upvoters.push(req.userId);
    }
    if (downvoters.includes(req.userId)) {
      downvoters = downvoters.filter(userId => userId != req.userId)
    }
    const votes = upvoters.length - downvoters.length;

    await DiscussionModel.updateOne({ _id: req.params.id }, {
      $set: {
        votes: votes,
        upvoters: upvoters,
        downvoters: downvoters
      }
    });

    discussion.upvoters = upvoters;
    discussion.downvoters = downvoters;

    // if number of likes has increased send a notification
    if (discussion.votes != votes && votes > 0) {
      NotificationController.createNotification(req.userId, "disc_upvote", `"${discussion.title}" now has ${votes} votes!`);
    }

    discussion.votes = votes;

    return res.send(discussion);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  }
}

/** Downvotes a discussion, idempotent
 *  DOES NOT send a notification to the creator of the discussion, to not make him sad :(
 * @param {*} req 
 * @param {*} res 
 */
const downvoteDiscussion = async(req,res) => {
  try {
    const discussion = await DiscussionModel.findById(req.params.id).exec();
    if (!discussion) return res.status(404).json({
      error: 'Not Found',
      message: `Discussion ${req.params.id} not found`
    });

    let upvoters = discussion.upvoters;
    let downvoters = discussion.downvoters;

    if (upvoters.includes(req.userId)) {
      upvoters = upvoters.filter(userId => userId != req.userId)
    }
    if (!downvoters.includes(req.userId)) {
      downvoters.push(req.userId);
    }
    const votes = upvoters.length - downvoters.length;

    await DiscussionModel.updateOne({ _id: req.params.id }, {
      $set: {
        votes: votes,
        upvoters: upvoters,
        downvoters: downvoters
      }
    });

    discussion.upvoters = upvoters;
    discussion.downvoters = downvoters;
    discussion.votes = votes;

    return res.send(discussion);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
}

const getDiscussionProfile = async (req,res) => { // not needed anymore
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

/** Initializes both upvoters and downvoters fields
 * 
 * @param {*} discussion 
 */
const initializeVoting = async (discussion) => {
  const upvoters = discussion.upvoters;
  if (!upvoters) {
    await discussion.updateOne({
      _id: req.params.id
    }, {
      $set: { upvoters: [] }
    }, {
      upsert: true
    }).exec();
  }
  const downvoters = discussion.downvoters;
  if (!downvoters) {
    await discussion.updateOne({
      _id: req.params.id
    }, {
      $set: { upvoters: [] }
    }, {
      upsert: true
    }).exec();
  }
}
// deletes a Discussion
const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await DiscussionModel.findById(req.params.id).exec();
    
    if (!discussion) return res.status(404).json({
      error: 'Not Found',
      message: `Discussion ${req.params.id} not found`
    });
    await DiscussionModel.deleteOne({ _id: req.params.id })
    const test = await UserModel.update({ _id: discussion.creatorId }, { $pull: { discussions: req.params.id } })
    res.send("Discussion deleted")
  } catch (err) {
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
  upvoteDiscussion,
  downvoteDiscussion,
  deleteDiscussion
};