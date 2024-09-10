import express, { Router } from 'express';
import { Add } from '@reaction/controllers/add-reactions';
import { Remove } from '@reaction/controllers/remove-reaction';
import { Get } from '@reaction/controllers/get-reactions';
import { authMiddlerWare } from '@global/helpers/auth-middlerware';

class ReactionRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/post/reactions/:postId', authMiddlerWare.checkAuthentication, Get.prototype.reactions);
    this.router.get(
      '/post/single/reaction/username/:username/:postId',
      authMiddlerWare.checkAuthentication,
      Get.prototype.singleReactionByUsername
    );
    this.router.get('/post/reactions/username/:username', authMiddlerWare.checkAuthentication, Get.prototype.reactionsByUsername);

    this.router.post('/post/reaction', authMiddlerWare.checkAuthentication, Add.prototype.reaction);

    this.router.delete(
      '/post/reaction/:postId/:previousReaction/:postReactions',
      authMiddlerWare.checkAuthentication,
      Remove.prototype.reaction
    );

    return this.router;
  }
}

export const reactionRoutes: ReactionRoutes = new ReactionRoutes();
