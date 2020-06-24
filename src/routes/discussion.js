var express = require('express');
var router = express.Router();

const discussionController = require('../controllers/discussion');

// create Discussion Route
router.post('/createDiscussion', discussionController.create);
router.get('/getDiscussion', discussionController.getDiscussion);
module.exports = router;
