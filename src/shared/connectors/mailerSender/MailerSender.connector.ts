import { Injectable } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

import { FailToSendEmailException } from '@shared/exceptions/FailToSendEmailException';

@Injectable()
export class MailerSenderConnector {
  private malerSend: MailerSend;

  constructor() {
    this.malerSend = new MailerSend({
      apiKey: process.env.MAILER_SEND_API_KEY,
    });
  }

  async sendEmail(email: string, name: string, subject: string, body: string) {
    try {
      const sentFrom = new Sender(
        'test@trial-vywj2lpz1mpg7oqz.mlsender.net',
        'Patrick Nicezi',
      ); //TODO - change for commercial mail and righ domain
      const recipients = [new Recipient(email, name)];

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject(subject)
        .setHtml(body);

      await this.malerSend.email.send(emailParams);
    } catch (error) {
      throw new FailToSendEmailException(error.body);
    }
  }
}
