// routes/profile.js

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const profileController = require('../controllers/profilecontroller');

// Profile upload route
router.post('/upload', ensureAuthenticated, profileController.uploadProfilePicture);

module.exports = router;
