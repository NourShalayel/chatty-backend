import express, { Router } from "express"
import { authMiddlerWare } from "@global/helpers/auth-middlerware";
import { Create } from "@post/controllers/create-post";
import { Get } from "@post/controllers/get-posts";

class PostRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/post/all/:page', authMiddlerWare.checkAuthentication, Get.prototype.posts)
    this.router.get('/post/images/:page', authMiddlerWare.checkAuthentication, Get.prototype.postsWithImages)

    this.router.post('/post', authMiddlerWare.checkAuthentication, Create.prototype.post)
    this.router.post('/post', authMiddlerWare.checkAuthentication, Create.prototype.post)
    this.router.post('/post/image/post', authMiddlerWare.checkAuthentication, Create.prototype.postWithImage)


    return this.router;
  }
};

export const postRoutes: PostRoutes = new PostRoutes()
