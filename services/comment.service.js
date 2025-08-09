class CommentService {
  constructor(commentModel) {
    this.commentModel = commentModel;
  }

  async createComment(commentData) {
    const comment = new this.commentModel(commentData);
    comment.createdAt = new Date();
    comment.author = commentData.author || 'Anonymous';
    comment.createdBy = commentData.author || 'Anonymous';
    comment.postId = commentData.postId;

    return await comment.save();
  }

  async getCommentsByPostId(postId) {
    return await this.commentModel.find({ postId });
  }
}

module.exports = CommentService;
