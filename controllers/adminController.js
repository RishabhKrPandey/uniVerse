
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');

// CRUD operations for Events
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newEvent = new Event({ title, description, date });
        await newEvent.save();
        res.redirect('/admin/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating event');
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndUpdate(id, req.body);
        res.redirect('/admin/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating event');
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        res.redirect('/admin/events');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting event');
    }
};

// CRUD operations for Announcements
exports.createAnnouncement = async (req, res) => {
    try {
        const { title, message } = req.body;
        const newAnnouncement = new Announcement({ title, message });
        await newAnnouncement.save();
        res.redirect('/admin/announcements');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating announcement');
    }
};

exports.updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        await Announcement.findByIdAndUpdate(id, req.body);
        res.redirect('/admin/announcements');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating announcement');
    }
};

exports.deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        await Announcement.findByIdAndDelete(id);
        res.redirect('/admin/announcements');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting announcement');
    }
};
