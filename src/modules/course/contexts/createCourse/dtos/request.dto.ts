import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CourseStatus } from '@shared/enums/course';

export class CreateCourseRequestDTO {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty({
    example: 'Introduction to programming',
    required: true,
  })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  @ApiProperty({
    example: 'This course will introduce you to programming in JavaScript',
    required: false,
  })
  description?: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(CourseStatus, { message: 'Status must be one of: ACTIVE, INACTIVE' })
  @ApiProperty({
    example: CourseStatus.ACTIVE,
    required: true,
    enum: CourseStatus,
  })
  status: CourseStatus;
}
