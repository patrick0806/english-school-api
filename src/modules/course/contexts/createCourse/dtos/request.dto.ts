import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class CourseSchoolDTO {
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  @ApiProperty({ example: 1 })
  id: number;
}

export class CreateCourseRequestDTO {
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'courseName' })
  name: string;

  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'description' })
  description: string;

  @IsBoolean({ message: 'validation.INVALID_BOOLEAN' })
  @ApiProperty({ example: true })
  isActive: boolean;

  @ValidateNested()
  @Type(() => CourseSchoolDTO)
  @ApiProperty({ example: { id: 1 } })
  school: CourseSchoolDTO;
}
