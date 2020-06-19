var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
  res.send('Login TODO');
});

router.post('/register', function(req, res, next) {
  res.send('Register TODO');
});

router.get('/me', function(req, res, next) {
  res.send('Me TODO');
});

router.get('/logout', function(req, res, next) {
  res.send('Logout TODO');
});

module.exports = router;
