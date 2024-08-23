import { NotAutherizedError } from './error-handler';
import { Request, Response, NextFunction } from "express";
import JWT from 'jsonwebtoken';
import { config } from "@root/config";
import { AuthPayload } from '@auth/interfaces/auth.interface';

export class AuthMiddlerWare {
  public verfiyUser(req: Request, res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      throw new NotAutherizedError('token is not available. Please login again')
    }


    try {
      const payload: AuthPayload = JWT.verify(req.session?.jwt, config.JWT_TOKEN!) as AuthPayload;
      req.currentUser = payload
    } catch (error) {
      throw new NotAutherizedError('token is invalid. Please login again')
    }
    next();
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new NotAutherizedError('Authentication is required to access this route.');
    }
    next();
  }
}

export const authMiddlerWare: AuthMiddlerWare = new AuthMiddlerWare();
