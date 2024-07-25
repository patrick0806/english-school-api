import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { School } from '@shared/entities';
import { SchoolRepository } from '@shared/repositories';

import { CreateSchoolController } from './contexts/createSchool/createSchool.controller';
import { CreateSchoolService } from './contexts/createSchool/createSchool.service';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  controllers: [CreateSchoolController],
  providers: [CreateSchoolService, SchoolRepository],
})
export class SchoolsModule {}
