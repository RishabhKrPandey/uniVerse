// models/Resource.js
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  originalName: String,
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);
