import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from "express";
import { config } from "@root/config";
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { BadRequestError } from '@global/helpers/error-handler';
import { authService } from '@service/db/auth.service';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { emailSchema, passwordSchema } from '@auth/schemas/password';
import crypto from 'crypto';
import { forgotPasswordTemplate } from '@service/emails/templates/forgot-password/forgot-password-template';
import { emailQueue } from '@service/queues/email.queue';
import moment from 'moment';
import publicIP from 'ip';
import { resetPasswordTemplate } from '@service/emails/templates/reset-password/reset-password-template';
import { IResetPasswordParams } from '@user/interfaces/user.interface';


export class Password {
  @joiValidation(emailSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const existingUser: IAuthDocument = await authService.getAuthUserByEmail(email);
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials')
    }

    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomChar: string = randomBytes.toString('hex');

    await authService.updatePasswordToken(`${existingUser._id!}`, randomChar, Date.now() * 60 * 60 * 1000);

    const resetLink = `${config.CLIENT_URL}/reset-password?token=${randomChar}`;
    const template: string = forgotPasswordTemplate.passwordResrtTemplate(existingUser.username!, resetLink);
    // emailQueue.addEmailJob('forgotPasswordEmail' , {template , receiverEmail : 'damon.baumbach40@ethereal.email' , subject : 'Reset your password'})
    emailQueue.addEmailJob('forgotPasswordEmail', { template, receiverEmail: email, subject: 'Reset your password' })

    res.status(HTTP_STATUS.OK).json({ message: 'Password reset email sent .' })

  }

  @joiValidation(passwordSchema)
  public async update(req: Request, res: Response): Promise<void> {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    if (password !== confirmPassword) {
      throw new BadRequestError('Passwords do not match');

    }
    const existingUser: IAuthDocument = await authService.getAuthUserByPasswordToken(token);
    if (!existingUser) {
      throw new BadRequestError('Reset token has expired .')
    }

    existingUser.password = password;
    existingUser.passwordResetToken = undefined;
    existingUser.passwordResetExpires = undefined;
    await existingUser.save();

    const templateParams: IResetPasswordParams = {
      username: existingUser.username!,
      email: existingUser.email,
      ipaddress: publicIP.address(),
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    const template: string = resetPasswordTemplate.passwordResetConfirmationTemplate(templateParams);
    emailQueue.addEmailJob('forgotPasswordEmail', { template, receiverEmail: existingUser.username!, subject: 'Password Reset confirmation' })
    res.status(HTTP_STATUS.OK).json({ message: 'Password successfully updated .' })

  }

}
