const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
  filename: { type: String, required: true }, // Store the file's name
  originalName: { type: String, required: true }, // Store the original name of the file
  filePath: { type: String, required: true }, // Store the path to the uploaded file
  uploadDate: { type: Date, default: Date.now } // Automatically set the upload date to now
});

// Export the Resource model
module.exports = mongoose.model('Resource', ResourceSchema);

