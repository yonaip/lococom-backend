var express = require('express');
var router = express.Router();

const commentController = require('../controllers/comment');

// create Comment Route
router.post('/createComment', commentController.create);
router.post('/getComment', commentController.getComment); // we can only send a body with a post request?
module.exports = router;
