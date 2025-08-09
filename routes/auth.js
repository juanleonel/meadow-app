const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserService = require('../services/user.service');

const UserController = require('../controllers/user.controller');
const userController = new UserController(new UserService());

router.get('/register', userController.getRegistrationForm.bind(userController));
router.post('/register', userController.submitRegistration.bind(userController));
router.get('/profile', userController.getProfile.bind(userController));
router.put('/profile', userController.submitProfile.bind(userController));

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);


// router.post('/login', passport.authenticate('local'), (req, res) => {
//   req.session.flash = {
//     type: 'success',
//     intro: 'Welcome back! ' + req.user.username,
//     message: 'We missed you while you were away.'
//   };

//   res.redirect('/');
// });

router.get('/login', (req, res) => {
  req.flash('error', 'Prueba de mensaje');

  return res.render('login', { title: 'Login', pageTestScript: undefined });
});

router.get('/logout', (req, res) => {
  return req.logout(() => res.redirect('/'));
});

module.exports = router;
