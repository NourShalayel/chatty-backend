import express, { Router } from 'express';
import { Get } from '@comment/controllers/get-comments';
import { Add } from '@comment/controllers/add-comment';
import { authMiddlerWare } from '@global/helpers/auth-middlerware';

class CommentRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/post/comments/:postId', authMiddlerWare.checkAuthentication, Get.prototype.comments);
    this.router.get('/post/commentsnames/:postId', authMiddlerWare.checkAuthentication, Get.prototype.commentsNamesFromCache);
    this.router.get('/post/single/comment/:postId/:commentId', authMiddlerWare.checkAuthentication, Get.prototype.singleComment);

    this.router.post('/post/comment', authMiddlerWare.checkAuthentication, Add.prototype.comment);

    return this.router;
  }
}

export const commentRoutes: CommentRoutes = new CommentRoutes();
