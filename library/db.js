const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/postdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión:', err));

module.exports = mongoose;
