module.exports = class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  /**
   * Create a new post
   * @param {Request} req 
   * @param {Response} res 
   * @returns 
   */
  async submitPost(req, res) {
    try {
      const postData = req.body;
      const newPost = await this.postService.createPost(postData);
      req.session.flash = {
        type: 'success',
        intro: 'Post created successfully!',
        message: `Your post titled "${newPost.title}" has been created.`
      };

      return res.redirect('/');
    } catch (error) {
      return next(error);
    }
  }

  async createPosts(req, res, next) {
    try {
      return res.render('post', {
        title: 'Create a new post',
        pageTestScript: 'tests-post',
      });
    } catch (error) {
      return next(error);
    }
  }

  async getPosts(req, res, next) {
    try {
      const posts = await this.postService.getAllPosts();
      
      return res.render('index', {
        title: 'Express app using ejs',
        pageTestScript: 'tests-global',
        posts
      });
    } catch (error) {
      return next(error);
    }
  }
}
