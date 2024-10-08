import { Module } from '@nestjs/common';

import { MailModule } from '@shared/providers';
import { UserRepository } from '@shared/repositories';

import { CreateUserController } from './contexts/createUser/createUser.controller';
import { CreateUserService } from './contexts/createUser/createuser.service';
import { UpdateUserController } from './contexts/updateUser/updateUser.controller';
import { UpdateUserService } from './contexts/updateUser/updateUser.service';

@Module({
  imports: [MailModule],
  controllers: [CreateUserController, UpdateUserController],
  providers: [CreateUserService, UpdateUserService, UserRepository],
})
export class UserModule {}
