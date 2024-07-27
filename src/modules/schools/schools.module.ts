import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { School } from '@shared/entities';
import { SchoolRepository } from '@shared/repositories';

import { CreateSchoolController } from './contexts/createSchool/createSchool.controller';
import { CreateSchoolService } from './contexts/createSchool/createSchool.service';
import { DisableSchoolController } from './contexts/disableSchool/disableSchool.controller';
import { DisableSchoolService } from './contexts/disableSchool/disableSchool.service';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  controllers: [CreateSchoolController, DisableSchoolController],
  providers: [CreateSchoolService, DisableSchoolService, SchoolRepository],
})
export class SchoolsModule {}
