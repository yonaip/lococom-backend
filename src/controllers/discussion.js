"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const DiscussionModel = require('../models/discussion');

const create = async (req,res) => {
  var newdiscussion = new DiscussionModel(req.body);

   console.log(new DiscussionModel(req.body));
   newdiscussion.save()
     .then(item => {
       res.send("Discussion saved to database");
     })
     .catch(err => {
       res.status(400).send("unable to save discussion to database");
     });
 }
 const getDiscussion = async (req,res) => {
  
    let discussion = await DiscussionModel.find({}).sort({_id:-1}).limit(1).exec();
    res.send(discussion);

 }
 




module.exports = {
    create,
    getDiscussion
    
};