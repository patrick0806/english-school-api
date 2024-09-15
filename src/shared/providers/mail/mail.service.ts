import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { User } from '@shared/entities';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPasswordConfirmation(
    user: User,
    token: string,
  ): Promise<void> {
    const url = `http://localhost:3000/auth/change-password?token=${token}`; //TODO - change this to the actual url

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Bfluent | Reset Password Request`,
      template: './resetPassword', // `.hbs` extension is appended automatically
      context: {
        name: user.name,
        schoolName: 'Bfluent',
        resetLink: url,
      },
    });
  }

  async sendWelcomeEmail(user: User, password: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `Bfluent | Welcome!`,
      template: './welcome',
      context: {
        definePasswordLink: 'http://localhost:3000/auth/define-password', //TODO - change this to the actual url
        name: user.name,
        email: user.email,
        password,
        schoolName: 'Bfluent',
      },
    });
  }
}
