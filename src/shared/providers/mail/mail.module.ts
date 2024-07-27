import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'node:path';

import { env } from '@config/env';

import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env.MAIL.HOST,
        port: env.MAIL.PORT,
        secure: env.MAIL.SECURITY,
        auth: {
          user: env.MAIL.USER,
          pass: env.MAIL.PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@patricknicezi.tech>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
