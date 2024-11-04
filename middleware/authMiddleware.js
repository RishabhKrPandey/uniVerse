
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
      // Set req.user to make it accessible in the routes
      req.user = req.session.user;
      next();
  } else {
      res.redirect('/auth/login');
  }
}

module.exports = { ensureAuthenticated };
