import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { SchoolMember } from '@shared/entities';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPasswordConfirmation(
    schoolMember: SchoolMember,
    token: string,
  ): Promise<void> {
    const url = `localhost:3000/auth/change-password?token=${token}`; //TODO - change this to the actual url

    await this.mailerService.sendMail({
      to: schoolMember.email,
      subject: `${schoolMember.school.name} | Reset Password Request`,
      template: './resetPassword', // `.hbs` extension is appended automatically
      context: {
        name: schoolMember.name,
        schoolName: schoolMember.school.name,
        resetLink: url,
      },
    });
  }
}
