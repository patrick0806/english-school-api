import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { BrasilAPIConnector } from '@shared/connector';

import { FindByZipCodeController } from './contexts/findByZipCodeController/findByZipCode.controller';
import { FindByZipCodeService } from './contexts/findByZipCodeController/findByZipCode.service';

@Module({
  imports: [HttpModule],
  controllers: [FindByZipCodeController],
  providers: [FindByZipCodeService, BrasilAPIConnector],
})
export class LocalityModule {}
