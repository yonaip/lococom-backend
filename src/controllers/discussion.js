"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const DiscussionModel = require('../models/discussion');

const createDiscussion = async (req,res) => {
  var newDiscussion = new DiscussionModel(req.body);

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
    let discussion = await DiscussionModel.findById(req.params.id).exec();
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
 
module.exports = {
    createDiscussion,
    getDiscussion
};