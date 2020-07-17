var express = require('express');
var router = express.Router();

const discussionController = require('../controllers/discussion');
const middlewares = require('../middlewares');

// Discussion routes
router.get('/discussion', discussionController.getAllDiscussions);
router.get('/discussion/:id', discussionController.getDiscussion);
router.post('/discussion', middlewares.checkAuthentication, discussionController.createDiscussion);
// TODO: router.delete(...)

// Voting routes
router.put('/discussion/:id/upvote', middlewares.checkAuthentication, discussionController.upvoteDiscussion);
router.put('/discussion/:id/downvote', middlewares.checkAuthentication, discussionController.downvoteDiscussion);

// Discussion profile
router.get('/discussion/discussionProfile/:id', discussionController.getDiscussionProfile);

module.exports = router;
