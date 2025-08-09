const path = require('path');
const express = require('express');
const session = require('express-session');
const formidable = require('formidable');
const passport = require('passport');
const flash = require('connect-flash');

const expressLayouts = require('express-ejs-layouts');
const { getFortune } = require('./library/fortune');
const credentials = require('./library/credentials');
const authRoutes = require('./routes/auth');
const { ensureAuthenticated } = require('./middlewares/auth');
require('./library/passport')(passport);

const port = process.env.PORT || 3100;
const app = express();

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(session({
  secret: credentials.cookieSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

app.use(function(req, res, next){
  const passportError = req.flash('error');

  if (passportError.length > 0) {
    req.session.flash = {
      type: 'danger',
      intro: 'Login failed!',
      message: passportError[0]
    };
  }

  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

app.use('/', authRoutes);


// Models and Controllers
const PostModel = require('./models/post.model');
const PostService = require('./services/post.service');
const CommentModel = require('./models/comment.model');
const CommentService = require('./services/comment.service');
const commentService = new CommentService(CommentModel);
const PostController = require('./controllers/post.controller');
const postService = new PostService(PostModel);
const postController = new PostController(postService, commentService);

app.get('/set-flash', (req, res) => {
  req.session.flash = {
    type: 'danger',
    intro: 'Welcome back!',
    message: 'We missed you while you were away.'
  };

  return res.redirect('/');
});

app.get('/', ensureAuthenticated, postController.getPosts.bind(postController));
app.post('/posts/create', ensureAuthenticated, postController.submitPost.bind(postController));
app.get('/posts/create', ensureAuthenticated, postController.createPosts.bind(postController));
app.post('/post/:id/comments', ensureAuthenticated, postController.createComment.bind(postController));
app.get('/post/:id/comments', ensureAuthenticated, postController.getComments.bind(postController));

app.get('/about', (req, res) => {
  return res.render('about',
    {
      title: 'About Meadowlark Travel',
      fortune: getFortune(),
      pageTestScript: 'tests-about'
    });
});

app.get('/tours/hood-river', function(req, res){
  return res.render('hood-river', { title: 'Express app using ejs' });
});
app.get('/tours/request-group-rate', function(req, res){
  return res.render('tours/request-group-rate');
});
app.get('/newsletter', function(req, res){
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  return res.render('newsletter', { csrf: 'CSRF token goes here', showTests: undefined, title: 'Sign up for our newsletter' });
});
app.post('/process', function(req, res){
  console.log('Form (from querystring): ' + req.query.form);
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);

  if(req.xhr || req.accepts('json,html') === 'json'){
    // if there were an error, we would send { error: 'error description' }
    return res.send({ success: true });
  } else {
    // if there were an error, we would redirect to an error page
    return res.redirect(303, '/thank-you');
  }
});
app.get('/thank-you', (req, res) => {
  return res.render('thank-you', { title: 'Thank You' });
});
app.get('/contest/vacation-photo',function(req,res){
  const now = new Date();

  return res.render('vacation-photo',{
    year: now.getFullYear(), month: now.getMonth(), showTests: undefined, title: 'Photo Contest'
  });
});
app.post('/contest/vacation-photo/:year/:month', function(req, res) {
  const form = new formidable.IncomingForm({
    multiples: false,
    uploadDir: path.join(__dirname, 'public/uploads'),
    keepExtensions: true, // mantiene la extensión original
  });
  
  form.parse(req, function(err, fields, files){
    if(err) return res.redirect(303, '/error');

    console.log('received fields:');
    console.log(fields);
    console.log('received files:');
    console.log(files);
    const imageFile = files.photo?.[0];
    const imageUrl = '/uploads/' + imageFile.newFilename;


    // res.render('upload-success', {
    //   title: 'Imagen subida',
    //   imageUrl: `/uploads/${filename}`
    // });

    res.redirect(303, '/upload-success?file=' + imageUrl + '&fileName=' + imageUrl);
  });
});

app.get('/upload-success', (req, res) => {
  const filename = req.query.fileName;

  return res.render('upload-success', { title: 'Upload Successful', filename: filename, showTests: undefined });
});

app.use((req, res) => {
  res.status(404).render('notfound', { title: '404: Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { title: '500: Server Error' });
});

app.listen(port, () => {
  console.log('Express started on http://localhost:' + port + ' ');
});
