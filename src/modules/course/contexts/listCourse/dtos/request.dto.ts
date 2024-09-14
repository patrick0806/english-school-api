import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class ListCourseRequestDTO {
  @ApiProperty({ example: 0, description: 'Page number starts from 0' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page: number;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  pageSize: number;
}
