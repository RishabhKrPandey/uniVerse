const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const Resource = require('../models/Resource');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resources/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Get resource-sharing page
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const resources = await Resource.find().populate('uploadedBy', 'name');
        res.render('resources', { user: req.user, resources });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Upload a new resource
router.post('/upload', ensureAuthenticated, upload.single('resourceFile'), async (req, res) => {
    try {
        const newResource = new Resource({
            title: req.body.title,
            description: req.body.description,
            filePath: req.file.path,
            uploadedBy: req.user._id,
        });
        await newResource.save();
        res.redirect('/resources');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Download a resource
router.get('/download/:id', ensureAuthenticated, async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).send('Resource not found');
        res.download(path.join(__dirname, '..', resource.filePath));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
