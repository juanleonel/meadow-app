const User = require('../models/user.model');
const password = require('password');
const localStrategy = require('passport-local').Strategy;

password.serializeUser(function(user, done) {
  return done(null, user._id);
});

password.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    return done(err, user);
  });
});
