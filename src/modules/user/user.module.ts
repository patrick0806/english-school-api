import { Module } from '@nestjs/common';

import { UserRepository } from '@shared/repositories';

import { CreateUserController } from './contexts/createUser/createUser.controller';
import { CreateUserService } from './contexts/createUser/createuser.service';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [CreateUserService, UserRepository],
})
export class UserModule {}
