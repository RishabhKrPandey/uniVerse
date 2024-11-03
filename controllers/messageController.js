// controllers/messageController.js
const Message = require('../models/Message');

exports.listMessages = async (req, res) => {
  const messages = await Message.find();
  res.render('messages', { messages });
};

exports.sendMessage = async (req, res) => {
  const message = new Message({
    sender: req.session.user._id,
    content: req.body.content,
  });
  await message.save();
  res.redirect('/messages');
};
