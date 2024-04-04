import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';

import { AuthGuard } from '@shared/guards/auth.guard';

import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RouterModule.register([
      { path: 'auth', module: AuthModule },
      { path: 'users', module: UserModule },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
