"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const CommentModel = require('../models/comment');

const create = async (req,res) => {
  var newComment = new CommentModel(req.body);

  console.log(new CommentModel(req.body));
  newComment.save()
    .then(item => {
      res.send("Comment saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save Comment to database");
    });
 }
 const getComment = async (req,res) => {
  console.log (req);
  let ID = req.body.id;
  
  let comment = await CommentModel.find({ discussionId : ID }).limit(1).exec();

  return res.status(200).json(comment);
}

    

 
 




module.exports = {
    create,
    getComment
    
};