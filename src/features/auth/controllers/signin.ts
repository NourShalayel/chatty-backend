import { Request, Response } from 'express';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { BadRequestError } from '@global/helpers/error-handler';
import { userService } from '@service/db/user.service';
import { signinSchema } from '@auth/schemas/signin';
import { forgotPasswordTemplate } from '@service/emails/templates/forgot-password/forgot-password-template';
import { emailQueue } from '@service/queues/email.queue';
import moment from 'moment';
import publicIP from 'ip';
import { IUserDocument } from '@user/interfaces/user.interface';
// import { mailTransport } from '@service/emails/mail.transport';

export class SignIn {
  @joiValidation(signinSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const existingUser: IAuthDocument = await authService.getAuthUserByUsername(username);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch: boolean = await existingUser.comparePassword(password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    const user: IUserDocument = await userService.getUserByAuthId(`${existingUser._id}`);
    const userJwt: string = JWT.sign(
      {
        userId: existingUser._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username,
        avatarColor: existingUser.avatarColor
      },
      config.JWT_TOKEN!
    );
    req.session = { jwt: userJwt };
    const userDocument: IUserDocument = {
      ...user,
      authId: existingUser!._id,
      username: existingUser!.username,
      email: existingUser!.email,
      avatarColor: existingUser!.avatarColor,
      uId: existingUser!.uId,
      createdAt: existingUser!.createdAt
    } as IUserDocument;

    // await mailTransport.sendEmail('cyrus17@ethereal.email' , 'Testing Development email' , 'this is a test email to show that development email sender works .');
      // const templateParams : IResetPasswordParams = {
      //   username : existingUser.username ,
      //   email : existingUser.email,
      //   ipaddress : publicIP.address(),
      //   date : moment().format('YYYY-MM-DD HH:mm:ss')
      // }
      // const resetLink = `${config.CLIENT_URL}/reset-password?token=123342342343244` ;
      // const template : string = forgotPasswordTemplate.passwordResrtTemplate(existingUser.username! , resetLink);
      // // emailQueue.addEmailJob('forgotPasswordEmail' , {template , receiverEmail : 'damon.baumbach40@ethereal.email' , subject : 'Reset your password'})
      // emailQueue.addEmailJob('forgotPasswordEmail' , {template , receiverEmail : 'damon.baumbach40@ethereal.email' , subject : 'Password Reset confirmation'})

      // console.log("send email done .");

    res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', user: userDocument, token: userJwt });
  }
}
