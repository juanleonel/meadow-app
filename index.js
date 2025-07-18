const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { getFortune } = require('./library/fortune');

const port = process.env.PORT || 3100;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use(expressLayouts);

app.get('/', (req, res) => {
  return res.render('index', { title: 'Express app using ejs' });
});

app.get('/about', (req, res) => {
  return res.render('about', { title: 'About Meadowlark Travel', fortune: getFortune() });
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
