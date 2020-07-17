"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');


const getUser = async (req,res) => {
 try {
    const user = await UserModel.findOne({username: req.params.id}).exec();
    if (!user) return res.status(404).json({
        error: 'Not Found',
        message: `User ${req.params.id} not found`
    });

    return res.send(user);
  } catch(err) {
      return res.status(500).json({
          error: 'Internal Server Error',
          message: err.message
      });
  }
 
}
const getUserfromId = async (req,res) => {
    try {
        const user = await UserModel.findOne({_id: req.params.id}).exec();
        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `User ${req.params.id} not found`
        });
    
        return res.send(user);
      } catch(err) {
          return res.status(500).json({
              error: 'Internal Server Error',
              message: err.message
          });
      }
}

const addFriend = async (req,res) => {
    try {
        const friend = await UserModel.findOne({username: req.body.friendname}).exec();
        if (!friend) return res.status(404).json({
            error: 'Not Found',
            message: `User ${req.body.friendname} not found`
        });

            
            await UserModel.update({ username : req.body.username }, {$push: {friendlist: friend._id }} )
            res.send(friend);
    
    
      } catch(err) {
        res.status(400).send(`Could not add ${friend} due to ${err}`);
      }
}

module.exports = {
   getUser,
   addFriend,
   getUserfromId
};