import { authRoutes } from "@auth/routes/authRoutes";
import { currentUserRoutes } from "@auth/routes/currentUserRoutes";
import { authMiddlerWare } from "@global/helpers/auth-middlerware";
import { postRoutes } from "@post/routes/postRoutes";
import { serverAdapter } from "@service/queues/base.queue";
import { Application } from "express";


const BASE_PATH = '/api/v1'
export default (app: Application) => {
  const routes = () => {
    app.use('/queues', serverAdapter.getRouter());
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, authRoutes.signOutRoute());

    app.use(BASE_PATH, authMiddlerWare.verfiyUser, currentUserRoutes.routes());
    app.use(BASE_PATH, authMiddlerWare.verfiyUser, postRoutes.routes());


  };

  routes();
};
