function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('info:', req.user);
    return next();
  }

  return res.redirect('/login');
}

module.exports = { ensureAuthenticated };
