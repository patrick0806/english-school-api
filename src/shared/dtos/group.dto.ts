import { ApiProperty } from '@nestjs/swagger';

import { CourseDTO } from './course.dto';
import { SchoolDTO } from './school.dto';
import { SchoolMemberDTO } from './schoolMember.dto';

export class GroupDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Group name' })
  name: string;

  @ApiProperty({ type: () => CourseDTO })
  course: () => CourseDTO;

  @ApiProperty({ type: () => SchoolDTO })
  school: SchoolDTO;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ type: () => [SchoolMemberDTO] })
  schoolMembers: SchoolMemberDTO[];

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  updatedAt: Date;
}
