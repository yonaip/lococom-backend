"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');

//gets a Userobject from a Username
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
//gets a Userobject from an ID
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
//adds Friend to User
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

// deletes Friend from User
const deleteFriend = async (req,res) => {
    try {
            console.log(req.body.friend)
            const test = await UserModel.update({ username : req.body.username }, {$pull: {friendlist: req.body.friend }} )
            res.send({test} );
    
    
      } catch(err) {
        res.status(400).send(`Could not add ${friend} due to ${err}`);
      }
}
module.exports = {
   getUser,
   addFriend,
   getUserfromId,
   deleteFriend
};