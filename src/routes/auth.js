var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth');
const middlewares = require('../middlewares');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/me', function(req, res, next) {
  res.send('Me TODO');
});

router.get('/logout', function(req, res, next) {
  res.send('Logout TODO');
});

module.exports = router;
