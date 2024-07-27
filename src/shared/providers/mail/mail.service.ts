import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { SchoolMember } from '@shared/entities';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPasswordConfirmation(
    schoolMember: SchoolMember,
    token: string = 'abc123',
  ): Promise<void> {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: schoolMember.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: schoolMember.name,
        url,
      },
    });
  }
}
