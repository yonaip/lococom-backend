var express = require('express');
var router = express.Router();

const commentController = require('../controllers/comment');

// create Comment Route
router.post('/comment', commentController.createComment);
router.get('/comment/:id', commentController.getComments); // we can only send a body with a post request?
module.exports = router;
