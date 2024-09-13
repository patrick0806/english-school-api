import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CourseStatus } from '@shared/enums/course';

export class UpdateCourseRequestDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Course 1' })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Description 1' })
  description?: string;

  @IsOptional()
  @IsEnum(CourseStatus)
  @ApiProperty({ example: CourseStatus.ACTIVE, enum: CourseStatus })
  status?: CourseStatus;
}
