"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const DiscussionModel = require('../models/discussion');

const createDiscussion = async (req,res) => {
  var newDiscussion = new DiscussionModel(req.body);

  console.log(new DiscussionModel(req.body));
  newDiscussion.save()
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(400).send("unable to save discussion to database");
    });
 }

const getDiscussion = async (req,res) => {
  try {
    let discussion = await DiscussionModel.find({}).sort({_id:-1}).limit(1).exec();
    if (discussion.length === 0) return res.status(404).json({
        error: 'Not Found',
        message: `Discussion not found`
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