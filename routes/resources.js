const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const Resource = require('../models/Resource');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/resources/';
        // Create the directory if it doesn't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using current timestamp and original name
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Get resource-sharing page
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        // Fetch resources from the database and populate the uploader's name
        const resources = await Resource.find().populate('uploader', 'name');
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
            uploader: req.user._id, // Reference to the user uploading the resource
            filename: req.file.filename, // Store the file's name
            originalName: req.file.originalname, // Store the original file name
            filePath: req.file.path // Store the path to the uploaded file
        });
        await newResource.save(); // Save the resource to the database
        res.redirect('/resources'); // Redirect to the resources page
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
        // Send the file for download
        const originalName = resource.originalName;
        res.download(path.join(__dirname, '..', resource.filePath), originalName);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
