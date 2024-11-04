const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const Message = require('../models/Message');
const User = require('../models/User'); // Import the User model

// Get messages page
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        // Fetch messages where the current user is either the sender or receiver
        const messages = await Message.find({ 
            $or: [{ sender: req.user._id }, { receiver: req.user._id }]
        })
        .populate('sender', 'name')  // Populate sender's name
        .populate('receiver', 'name') // Populate receiver's name
        .sort({ createdAt: -1 }); // Sort by date in descending order

        // Fetch all users except the current user
        const users = await User.find({ _id: { $ne: req.user._id } }); // Exclude the logged-in user

        // Render the view with `messages` and `users`
        res.render('messages', { user: req.user, messages, users });
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
