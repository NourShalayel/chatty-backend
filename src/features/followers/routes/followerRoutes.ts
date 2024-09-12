import express, { Router } from 'express';
import { Add } from '@follower/controllers/follower-user';
import { Get } from '@follower/controllers/get-followers';
import { AddUser } from '@follower/controllers/block-user';
import { authMiddlerWare } from '@global/helpers/auth-middlerware';
import { Remove } from '@follower/controllers/unfollowe-user';

class FollowerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }


  public routes(): Router {
    this.router.get('/user/following', authMiddlerWare.checkAuthentication, Get.prototype.userFollowing);
    this.router.get('/user/followers/:userId', authMiddlerWare.checkAuthentication, Get.prototype.userFollowers);

    this.router.put('/user/follow/:followerId', authMiddlerWare.checkAuthentication, Add.prototype.follower);
    this.router.put('/user/unfollow/:followeeId/:followerId', authMiddlerWare.checkAuthentication, Remove.prototype.follower);

    this.router.put('/user/block/:followerId', authMiddlerWare.checkAuthentication, AddUser.prototype.block);
    this.router.put('/user/unblock/:followerId', authMiddlerWare.checkAuthentication, AddUser.prototype.unblock);

    return this.router;
  }
}

export const followerRoutes: FollowerRoutes = new FollowerRoutes();
