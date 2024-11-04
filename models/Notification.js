const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: String,
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false } // To track if the notification is read or unread
});

module.exports = mongoose.model('Notification', NotificationSchema);
