var express = require('express');
var router = express.Router();

const commentController = require('../controllers/comment');

// create Comment Route
router.post('/comment', commentController.createComment);
router.get('/comment/:id', commentController.getComments);
router.put('/comment/upvote/:id', commentController.upvote);
router.put('/comment/downvote/:id', commentController.downvote);
router.get('/comment/getCommentProfile/:id', commentController.getCommentProfile);

module.exports = router;
