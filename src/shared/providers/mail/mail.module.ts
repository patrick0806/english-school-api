import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'node:path';

import env from '@config/env';

import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env().mail.host,
        port: env().mail.port,
        secure: env().mail.security,
        auth: {
          user: env().mail.user,
          pass: env().mail.password,
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
