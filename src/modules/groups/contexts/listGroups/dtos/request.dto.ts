import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ListGroupsRequestDTO {
  @ApiProperty({ example: 0, description: 'Page starts 0' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(0)
  page: number;

  @ApiProperty({ example: 10, description: 'Items per page' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1)
  pageSize: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Group name', required: false })
  name?: string;
}
