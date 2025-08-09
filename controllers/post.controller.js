module.exports = class PostController {
  constructor(postService, commentService) {
    this.postService = postService;
    this.commentService = commentService;
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
      const user = req.user;
      const posts = await this.postService.getAllPosts();
      
      return res.render('index', {
        user,
        title: 'Express app using ejs',
        pageTestScript: 'tests-global',
        posts
      });
    } catch (error) {
      return next(error);
    }
  }

  async createComment(req, res, next) {
    try {
      const postId = req.params.id;
      const commentData = {
        postId: postId,
        ...req.body,
      };

      const newComment = await this.commentService.createComment(commentData);
      req.session.flash = {
        type: 'success',
        intro: 'Comment added successfully!',
        message: `Your comment has been added.`
      };

      return res.redirect(`/post/${postId}/comments`);
    } catch (error) {
      return next(error);
    }
  }
  async getComments(req, res, next) {
    try {
      const postId = req.params.id;
      const comments = await this.commentService.getCommentsByPostId(postId);

      return res.render('comments', {
        title: 'Comments',
        comments,
        postId
      });
    } catch (error) {
      return next(error);
    }
  }
}
