"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const FriendsListmodel = require('../models/friendlist');
const User = require('../models/user');

const createFriendslist = async (req,res) => {
   const doesUserexist = await User.findOne({username: req.body.friends[0]}).exec();
   if(doesUserexist == null){
   res.send("User does not exist");}
   else{
  
    
        const alreadyexists = await FriendsListmodel.findOne({username: req.body.username}).exec();
         if (!alreadyexists) 
         {
         const friends = new FriendsListmodel(req.body);
     
         friends.save()
           .then(item => {
             res.send(item);
           })
           .catch(err => {
             res.status(400).send(`Could not create ${friends} due to ${err}`);
           });
         }
         else
         {
         const id = alreadyexists._id;
         const update = await FriendsListmodel.update({_id: id}, {$addToSet: { friends: req.body.friends[0]}})
         res.send("Added new Friend");
         }}
   
}

  
        

const getFriendslist = async (req,res) => {
    try {
        const friends = await FriendsListmodel.findOne({username:req.params.id}).exec();
        
        if (!friends) return res.status(404).json({
            error: 'Not Found',
            message: `Friendlist for ${req.params.id} not found`
        });
        
        return res.send(friends.friends);
      } catch(err) {
          return res.status(500).json({
              error: 'Internal Server Error',
              message: err.message
          });
      }
    }

    


module.exports = {
    getFriendslist,
    createFriendslist
};