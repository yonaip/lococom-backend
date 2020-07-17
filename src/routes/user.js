var express = require('express');
var router = express.Router();

const usercontroller = require('../controllers/user');

// create Comment Route
router.get('/user/:id', usercontroller.getUser);
router.get('/user/id/:id', usercontroller.getUserfromId);
router.post('/user/friendlist/', usercontroller.addFriend);
module.exports = router;
