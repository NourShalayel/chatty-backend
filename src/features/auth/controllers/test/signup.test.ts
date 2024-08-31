import { Request, Response } from "express";
import * as cloudinaryUploads from '@global/helpers/cloudinary-upload';
import { authMockRequest, authMockResponse } from "@root/mocks/auth.mock";
import { SignUp } from "../signup";
import { CustomError } from "@global/helpers/error-handler";

jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/user.cache');
jest.mock('@service/queues/user.queue');
jest.mock('@service/queues/auth.queue');
jest.mock('@global/helpers/cloudinary-upload');


describe('SignUp', () => {
  it('should throw an error if username is not available', () => {
    const req: Request = authMockRequest({}, {
      username: '',
      email: 'nourjamal013@gmail.com',
      password: '17192001',
      avatarColor: 'red',
      avatarImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAGUlEQVR4nGKZKOXAgASYGFABqXxAAAAA//9KuwD4R5LKTwAAAABJRU5ErkJggg=='
    }) as Request;

    const res: Response = authMockResponse();

    SignUp.prototype.create(req, res).catch(
      (error: CustomError) => {

        expect(error.statusCode).toEqual(400);
        expect(error.serializeErrors().message).toEqual('Username is required');

      }
    );
  })
});
