// routes/events.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.listEvents);
router.post('/rsvp/:id', eventController.rsvpEvent);

module.exports = router;
