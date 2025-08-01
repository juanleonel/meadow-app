const db = require('../library/db');

const postSchema = new db.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  images: [{ type: String }],
  createdAt: { type: Date },
  updatedAt: { type: Date },
  isActive: { type: Boolean, default: true },
  tags: [{ type: String }],
  createdBy: { type: String, required: true },
  updatedBy: { type: String }
});

const Post = db.model('Post', postSchema);

module.exports = Post;
