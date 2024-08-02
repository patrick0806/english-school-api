import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { SchoolMemberRole } from '@shared/enums';

import { CourseDTO } from './course.dto';
import { GroupDTO } from './group.dto';
import { SchoolDTO } from './school.dto';
import { SchoolMemberContractDTO } from './schoolMemberContract.dto';

export class SchoolMemberDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'jhondoe@email.com' })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({ example: '1234567890' })
  phoneNumber: string;

  @ApiProperty({ example: 'BI-00001-PN' })
  userCode: string;

  @ApiProperty({ example: 'true' })
  isActive: boolean;

  @ApiProperty({ example: SchoolMemberRole.TEACHER, enum: SchoolMemberRole })
  role: SchoolMemberRole;

  @ApiProperty({ type: () => SchoolDTO })
  school: SchoolDTO;

  @ApiProperty({ type: () => [CourseDTO] })
  courses: CourseDTO[];

  @ApiProperty({ type: () => [GroupDTO] })
  groups: GroupDTO[];

  @ApiProperty({ type: () => [SchoolMemberContractDTO] })
  contracts: SchoolMemberContractDTO[];

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  updatedAt: Date;
}
