// controllers/profileController.js

const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/profileImages');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Handle profile picture upload
exports.uploadProfilePicture = [
    upload.single('profileImage'),
    async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            user.profileImagePath = `/uploads/profileImages/${req.file.filename}`;
            await user.save();
            res.redirect('/profile');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error uploading profile picture');
        }
    }
];
