import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserRepository } from '@shared/repositories/user.repository';

import { SignInController } from './contexts/signIn/signIn.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [SignInController],
  providers: [UserRepository],
})
export class AuthModule {}
