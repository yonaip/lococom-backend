var express = require('express');
var router = express.Router();

const chatController = require('../controllers/chat');
const middlewares = require('../middlewares');

router.get('/chat/:id', middlewares.checkAuthentication, chatController.getChat);
router.get('/chat/:id/comment', middlewares.checkAuthentication, chatController.getChatComments);
router.post('/chat/:id/comment', middlewares.checkAuthentication, chatController.postChatComment);

module.exports = router;
