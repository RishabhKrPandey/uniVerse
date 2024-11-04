
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const multer = require('multer');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const passport = require('passport');
require('dotenv').config();
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// Flash messages
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const eventRoutes = require('./routes/events');
const messageRoutes = require('./routes/messages');
const resourceRoutes = require('./routes/resources');
const notificationRoutes = require('./routes/notifications');
const profileRoutes = require('./routes/profile');
const adminRoutes = require('./routes/admin');

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/events', eventRoutes);
app.use('/messages', messageRoutes);
app.use('/resources', resourceRoutes);
app.use('/notifications', notificationRoutes);
app.use('/profile', profileRoutes);
app.use('/admin', adminRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
