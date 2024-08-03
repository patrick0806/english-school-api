import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SchoolMember, SchoolMemberContract } from '@shared/entities';
import { PdfService } from '@shared/providers';
import { SchoolMemberRepository } from '@shared/repositories';
import { SchoolMemberContracRepository } from '@shared/repositories/schoolMemberContract.repository';

import { CreateContractController } from './contexts/createContract/createContract.controller';
import { CreateContractService } from './contexts/createContract/createContract.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolMemberContract, SchoolMember])],
  controllers: [CreateContractController],
  providers: [
    CreateContractService,
    PdfService,
    SchoolMemberRepository,
    SchoolMemberContracRepository,
  ],
})
export class SchoolMembersContractsModule {}
