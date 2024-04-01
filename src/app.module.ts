import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';

import { AuthGuard } from '@shared/guards/auth.guard';

import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RouterModule.register([{ path: 'auth', module: AuthModule }]),
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
