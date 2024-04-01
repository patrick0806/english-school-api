import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
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
  providers: [],
  exports: [],
})
export class AuthModule {}
