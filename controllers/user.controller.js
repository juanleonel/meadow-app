const path = require('path');
const UploadService = require('../services/upload.service');
const { setMessageFlash } = require('../library/utils');

module.exports = class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async submitRegistration(req, res, next) {
    try {
      const config = {
        uploadDir: path.join(__dirname, '../public/uploads'),
        keepExtensions: true,
        multiples: false,
        allowEmptyFiles: true,
        minFileSize: 0,
      }
      const uploadService = new UploadService(config).init();
      const { fields, files } = await uploadService.upload(req);
      // const imageFile = files.profilePicture[0];
      // const imageUrl = imageFile ? '/uploads/' + imageFile.newFilename : null;
      console.log('data:', fields);

      const newUser = await this.userService.createUser(fields);
      setMessageFlash(req, {
        type: 'success',
        intro: 'Registration successful!',
        message: 'You can now log in with your credentials.'
      });

      return res.redirect('/login');
    }
    catch (error) {
      const message = error.details || error.message;
      setMessageFlash(req, {
        type: 'warning',
        intro: 'Registration failed!',
        message: message || 'An unexpected error occurred.'
      });
      return res.redirect('/register')
    }
  }

  async getRegistrationForm(req, res, next) {
    try {
      return res.render('register', {
        title: 'Register',
        pageTestScript: undefined
      });
    } catch (error) {
      return next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      console.log(req.user);
      const user = await this.userService.getUserById(req.user._id);

      return res.render('profile', {
        title: 'Profile',
        pageTestScript: undefined,
        user: user
      });
    } catch (error) {
      return next(error);
    }
  }

  async submitProfile(req, res) {
    try {
      
    } catch (error) {
      
    }
  }
}