
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

// Signup
exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.redirect('/auth/login');
  } catch (error) {
    res.status(500).send('Error registering');
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    res.status(400).send('Invalid credentials');
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect('/auth/login');
  });
};
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
      cb(null, `${req.session.user._id}-${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
  const upload = multer({ storage });
  
  exports.uploadProfilePhoto = [
    upload.single('profilePhoto'),
    async (req, res) => {
      try {
        const user = await User.findById(req.session.user._id);
        user.profilePhoto = `/uploads/${req.file.filename}`;
        await user.save();
        res.redirect('/profile');
      } catch (error) {
        res.status(500).send('Error uploading profile photo');
      }
    }
  ];