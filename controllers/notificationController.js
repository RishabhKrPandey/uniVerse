
const Notification = require('../models/Notification');

exports.listNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.render('notifications', { user: req.user, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
