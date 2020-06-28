var express = require('express');
var router = express.Router();

const discussionController = require('../controllers/discussion');

// create Discussion Route
router.post('/discussion', discussionController.createDiscussion);
router.get('/discussion', discussionController.getDiscussion);
module.exports = router;
