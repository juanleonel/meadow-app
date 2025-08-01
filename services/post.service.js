class PostService {
  constructor(postModel) {
    this.postModel = postModel;
  }

  async createPost(postData) {
    const post = new this.postModel(postData);
    post.createdAt = new Date();
    post.author = postData.author || 'ADMIN';
    post.createdBy = postData.author || 'ADMIN';
    post.tags = postData.tags || [];

    return await post.save();
  }

  async getPostById(postId) {
    return await this.postModel.findById(postId);
  }

  async updatePost(postId, updateData) {
    return await this.postModel.findByIdAndUpdate(postId, updateData, { new: true });
  }

  async deletePost(postId) {
    return await this.postModel.findByIdAndDelete(postId);
  }

  async getAllPosts() {
    return await this.postModel.find({});
  }
}

module.exports = PostService;
