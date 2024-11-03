const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware'); // Destructure the middleware function
const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');

router.get('/', ensureAuthenticated, dashboardController.showDashboard);
router.post('/uploadProfilePhoto', ensureAuthenticated, authController.uploadProfilePhoto);

module.exports = router;
