const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { getFortune } = require('./library/fortune');
const { title } = require('process');

const port = process.env.PORT || 3100;
const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use(expressLayouts);

app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

app.get('/', (req, res) => {
  return res.render('index',
    {
      title: 'Express app using ejs',
      pageTestScript: 'tests-global',
    }
  );
});

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
