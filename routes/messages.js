const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const Message = require('../models/Message');

// Get messages page
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const messages = await Message.find({ 
            $or: [{ sender: req.user._id }, { receiver: req.user._id }]
        }).populate('sender receiver', 'name'); // Populate sender and receiver names
        res.render('messages', { user: req.user, messages });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Send a new message
router.post('/send', ensureAuthenticated, async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        const newMessage = new Message({
            sender: req.user._id,
            receiver: receiverId,
            content,
        });
        await newMessage.save();
        res.redirect('/messages');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
