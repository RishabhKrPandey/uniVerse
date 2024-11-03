const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');

// Get notifications page
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ date: -1 });
        res.render('notifications', { user: req.user, notifications });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Mark a notification as read
router.post('/mark-read/:id', ensureAuthenticated, async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.redirect('/notifications');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
