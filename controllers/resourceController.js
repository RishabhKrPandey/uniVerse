
const Resource = require('../models/Resource');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/resources/' });

exports.listResources = async (req, res) => {
  const resources = await Resource.find();
  res.render('resources', { resources });
};

exports.uploadResource = [
  upload.single('file'),
  async (req, res) => {
    const resource = new Resource({
      uploader: req.session.user._id,
      filename: req.file.filename,
      originalName: req.file.originalname,
    });
    await resource.save();
    res.redirect('/resources');
  }
];
