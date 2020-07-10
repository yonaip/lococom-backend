var express = require('express');
var router = express.Router();

const friendslistcontroller = require('../controllers/friendslist');


// create Comment Route
router.post('/friendslist/', friendslistcontroller.createFriendslist);
router.get('/friendslist/:id', friendslistcontroller.getFriendslist);


module.exports = router;
