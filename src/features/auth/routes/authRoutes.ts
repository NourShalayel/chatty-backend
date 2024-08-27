import { SignIn } from '@auth/controllers/signin';
import { SignUp } from './../controllers/signup';
import express, { Router } from "express"
import { SignOut } from '@auth/controllers/signout';
import { Password } from '@auth/controllers/password';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/signup', SignUp.prototype.create)
    this.router.post('/signin', SignIn.prototype.read)
    this.router.post('/forgot-password' , Password.prototype.create)
    this.router.post('/reset-password/:token' , Password.prototype.update)

    return this.router;
  }

  public signOutRoute(): Router {
    this.router.get('/signout', SignOut.prototype.update)

    return this.router;
  }
};

export const authRoutes: AuthRoutes = new AuthRoutes()
