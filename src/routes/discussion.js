var express = require('express');
var router = express.Router();

const discussionController = require('../controllers/discussion');
const middlewares = require('../middlewares');

// Discussion routes
router.get('/discussion', discussionController.getAllDiscussions);
router.get('/discussion/:id', discussionController.getDiscussion);
router.post('/discussion', middlewares.checkAuthentication, discussionController.createDiscussion);

// Comment routes
router.put('/discussion/upvote/:id', discussionController.upvote);
router.put('/discussion/downvote/:id', discussionController.downvote);
router.get('/discussion/discussionProfile/:id', discussionController.getDiscussionProfile);

module.exports = router;
