import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class ListCoursesRequestDTO {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 0, description: 'Page starts 0' })
  page: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 10, description: 'Items per page' })
  pageSize: number;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ description: 'Course name', required: false })
  name?: string;
}
