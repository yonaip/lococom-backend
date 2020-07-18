var express = require('express');
var router = express.Router();

const usercontroller = require('../controllers/user');
const middlewares = require('../middlewares');

// create Comment Route
router.get('/user/:id', usercontroller.getUser);
router.get('/user/id/:id', usercontroller.getUserfromId);
router.post('/user/friendlist/:id', middlewares.checkAuthentication, usercontroller.addFriend);
router.delete('/user/friendlist/:id', middlewares.checkAuthentication, usercontroller.deleteFriend)
module.exports = router;
