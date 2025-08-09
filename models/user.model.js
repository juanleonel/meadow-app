const db = require('../library/db');

const userSchema = new db.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  isActive: { type: Boolean, default: true },
  updatedBy: { type: String },
  lastName: { type: String },
  firstName: { type: String },
  bio: { type: String },
  profilePicture: { type: String }
});

const User = db.model('User', userSchema);

module.exports = User;
