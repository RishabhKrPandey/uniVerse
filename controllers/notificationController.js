// controllers/notificationController.js
const Notification = require('../models/Notification');

exports.listNotifications = async (req, res) => {
  const notifications = await Notification.find();
  res.render('notifications', { notifications });
};
