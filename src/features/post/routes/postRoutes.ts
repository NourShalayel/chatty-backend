import express, { Router } from "express"
import { authMiddlerWare } from "@global/helpers/auth-middlerware";
import { Create } from "@post/controllers/create-post";
import { Get } from "@post/controllers/get-posts";
import { Delete } from "@post/controllers/delete-post";
import { Update } from "@post/controllers/update-post";

class PostRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/post/all/:page', authMiddlerWare.checkAuthentication, Get.prototype.posts)
    this.router.get('/post/images/:page', authMiddlerWare.checkAuthentication, Get.prototype.postsWithImages)

    this.router.post('/post', authMiddlerWare.checkAuthentication, Create.prototype.post)
    this.router.post('/post/image/post', authMiddlerWare.checkAuthentication, Create.prototype.postWithImage)

    this.router.delete('/post/:postId', authMiddlerWare.checkAuthentication, Delete.prototype.post)

    this.router.put('/post/:postId', authMiddlerWare.checkAuthentication, Update.prototype.posts);


    return this.router;
  }
};

export const postRoutes: PostRoutes = new PostRoutes()
