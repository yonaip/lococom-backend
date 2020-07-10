var express = require('express');
var router = express.Router();

const discussionController = require('../controllers/discussion');

// create Discussion Route
router.post('/discussion', discussionController.createDiscussion);
router.get('/discussion', discussionController.getAllDiscussions);
router.get('/discussion/:id', discussionController.getDiscussion);
router.put('/discussion/upvote/:id', discussionController.upvote);
router.put('/discussion/downvote/:id', discussionController.downvote);
router.get('/discussion/getDiscussionProfile/:id', discussionController.getDiscussionProfile);


module.exports = router;
