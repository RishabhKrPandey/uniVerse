
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  department: String,
  year:Number,
  password: String,
  profilePhoto: String,
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
