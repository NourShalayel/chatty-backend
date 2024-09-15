import express, { Router } from 'express';
import { Update } from '@notification/controllers/update-notification';
import { Delete } from '@notification/controllers/delete-notification';
import { Get } from '@notification/controllers/get-notifications';
import { authMiddlerWare } from '@global/helpers/auth-middlerware';

class NotificationRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/notifications', authMiddlerWare.checkAuthentication, Get.prototype.notifications);
    this.router.put('/notification/:notificationId', authMiddlerWare.checkAuthentication, Update.prototype.notification);
    this.router.delete('/notification/:notificationId', authMiddlerWare.checkAuthentication, Delete.prototype.notification);

    return this.router;
  }
}

export const notificationRoutes: NotificationRoutes = new NotificationRoutes();
