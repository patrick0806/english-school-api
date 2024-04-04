import { Module } from '@nestjs/common';

import { MailerSenderConnector } from '@shared/connectors';
import { UserRepository } from '@shared/repositories/user.repository';

import { CreateUserController } from './contexts/createUser/createUser.controller';
import { CreateUserService } from './contexts/createUser/createUser.service';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [CreateUserService, MailerSenderConnector, UserRepository],
})
export class UserModule {}
