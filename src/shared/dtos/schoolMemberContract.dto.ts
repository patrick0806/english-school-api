import { ApiProperty } from '@nestjs/swagger';

import { SchoolMember } from '@shared/entities';
import { ContractStatus } from '@shared/enums';

import { CourseDTO } from './course.dto';

export class SchoolMemberContractDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 100 })
  monthlyValue: number;

  @ApiProperty({ example: 12 })
  numberOfMonths: number;

  @ApiProperty({ example: '2022-05-01' })
  startDate: Date;

  @ApiProperty({ example: 2 })
  amount_classes_weekly: number;

  @ApiProperty({ example: ContractStatus.ACTIVE, enum: ContractStatus })
  status: ContractStatus;

  @ApiProperty({ type: () => CourseDTO })
  course: () => CourseDTO;

  @ApiProperty({ type: () => SchoolMember })
  schoolMember: SchoolMember;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  updatedAt: Date;
}
