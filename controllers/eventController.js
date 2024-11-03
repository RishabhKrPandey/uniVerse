// controllers/eventController.js
const Event = require('../models/Event');

exports.listEvents = async (req, res) => {
  const events = await Event.find();
  res.render('events', { events });
};

exports.rsvpEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  event.participants.push(req.session.user._id);
  await event.save();
  res.redirect('/events');
};
