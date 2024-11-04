// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', authController.login);
router.get('/register', (req, res) => res.render('auth/signup'));
router.post('/register', authController.register);
router.get('/logout', authController.logout);

module.exports = router;
