import { Injectable } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

@Injectable()
export class MailerSenderConnector {
  private malerSend: MailerSend;

  constructor() {
    this.malerSend = new MailerSend({
      apiKey: process.env.MAILER_SEND_API_KEY,
    });
  }

  async sendEmail(email: string, name: string, subject: string, body: string) {
    const sentFrom = new Sender('patrickk0806@gmail.com', 'Patrick Nicezi'); //TODO - change for commercial mail
    const recipients = [new Recipient(email, name)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(subject)
      .setHtml(body);

    await this.malerSend.email.send(emailParams);
  }
}
