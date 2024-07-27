import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { School, SchoolMember } from '@shared/entities';
import { SchoolMemberRepository, SchoolRepository } from '@shared/repositories';

import { CreateSchoolMemberController } from './contexts/createSchoolMember/createSchoolMember.controller';
import { CreateSchoolMemberService } from './contexts/createSchoolMember/createSchoolMember.service';

@Module({
  imports: [TypeOrmModule.forFeature([School, SchoolMember])],
  controllers: [CreateSchoolMemberController],
  providers: [
    CreateSchoolMemberService,
    SchoolMemberRepository,
    SchoolRepository,
  ],
})
export class SchoolMembersModule {}
