const db = require('../library/db');

const postSchema = new db.Schema({
  postId: { type: String, required: true },
  comment: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  isActive: { type: Boolean, default: true },
  createdBy: { type: String, required: true },
  updatedBy: { type: String }
});

const Comment = db.model('Comment', postSchema);

module.exports = Comment;
