import { ApiProperty } from '@nestjs/swagger';

import { CourseStatus } from '@shared/enums/course';

export class CourseDTO {
  @ApiProperty({ example: 1, nullable: true })
  id: number;

  @ApiProperty({ example: 'English' })
  name: string;

  @ApiProperty({ example: 'English Course' })
  description: string;

  @ApiProperty({ example: CourseStatus.ACTIVE, enum: CourseStatus })
  status: string;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  updatedAt: Date;
}
