const LocalStrategy = require('passport-local').Strategy;
const UserService = require('../services/user.service');
const userService = new UserService();

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await userService.getUserByEmail(email);
      const isUserValid = user?.password === password;

      if (isUserValid) {
        return done(null, { _id: user._id, username: user.username, email: user.email, password: user.password });
      }

      return done(null, false, { message: 'Error  try later' });
    } catch (err) {
      return done(err);
    }
  }
));


  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser(async (info, done) => {
    try {
      return done(null, info);
    } catch (err) {
      return done(err);
    }
  });
};
