import { ApiProperty } from '@nestjs/swagger';

import { SchoolDTO } from './school.dto';
import { SchoolMemberDTO } from './schoolMember.dto';

export class CourseDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Course name' })
  name: string;

  @ApiProperty({ example: 'Course description' })
  description: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  //TODO add GroupDTO
  //TODO add SchoolMemberContractDTO

  @ApiProperty({ type: () => [SchoolMemberDTO] })
  schoolMembers: SchoolMemberDTO[];

  @ApiProperty({ type: () => SchoolDTO })
  school: SchoolDTO;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  updatedAt: Date;
}
