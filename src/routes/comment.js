var express = require('express');
var router = express.Router();

const commentController = require('../controllers/comment');
const middlewares = require('../middlewares');

// create Comment Route
router.get('/comment/:id', commentController.getComments);
router.post('/comment', middlewares.checkAuthentication, commentController.createComment);
// router.put('/comment/upvote/:id', commentController.upvote);
// router.put('/comment/downvote/:id', commentController.downvote);
router.get('/comment/CommentProfile/:id', commentController.CommentProfile);
router.delete('/comment/:id', middlewares.checkAuthentication, commentController.deleteComment);
module.exports = router;
