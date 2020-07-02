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
 /*const getComment = async (req,res) => {
  console.log (req);
  let ID = req.body.id;
  
  let comment = await CommentModel.find({ discussionId : ID }).limit(1).exec();

  return res.status(200).json(comment);
}*/

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
    

 
 




module.exports = {
    createComment,
    getComments
    
};