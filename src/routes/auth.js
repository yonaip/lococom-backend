var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth');
const middlewares = require('../middlewares');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/me', middlewares.checkAuthentication, authController.me);

router.get('/logout', middlewares.checkAuthentication, authController.logout);

module.exports = router;
