var express = require('express');
var router = express.Router();

const notificationController = require('../controllers/notification');
const middlewares = require('../middlewares');

// Notification Routes
router.get('/notification', middlewares.checkAuthentication, notificationController.getNotifications);
router.delete('/notification/:id', middlewares.checkAuthentication, notificationController.deleteNotification);
// router.get('/notification/:id', middlewares.checkAuthentication, notificationController.getNotifications);
// router.put('/notification/:id', middlewares.checkAuthentication, notificationController.getNotifications);

module.exports = router;