import express, { Router } from "express"
import { CurrentUser } from '@auth/controllers/current-user';
import { authMiddlerWare } from "@global/helpers/auth-middlerware";

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/currentuser',authMiddlerWare.checkAuthentication ,  CurrentUser.prototype.read)

    return this.router;
  }

};

export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes()
