
const express = require('express');
const router = express.Router();
const ensureAdmin = require('../middleware/adminMiddleware');
const adminController = require('../controllers/adminController');

// Routes for Events
router.get('/events', ensureAdmin, async (req, res) => {
    const events = await Event.find();
    res.render('/eventAdmin', { events });
});

router.post('/events', ensureAdmin, adminController.createEvent);
router.post('/events/:id/update', ensureAdmin, adminController.updateEvent);
router.post('/events/:id/delete', ensureAdmin, adminController.deleteEvent);

// Routes for Announcements
router.get('/announcements', ensureAdmin, async (req, res) => {
    const announcements = await Announcement.find();
    res.render('/announcementAdmin', { announcements });
});

router.post('/announcements', ensureAdmin, adminController.createAnnouncement);
router.post('/announcements/:id/update', ensureAdmin, adminController.updateAnnouncement);
router.post('/announcements/:id/delete', ensureAdmin, adminController.deleteAnnouncement);

module.exports = router;
