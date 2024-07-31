import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class GroupCourseDTO {
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  @ApiProperty({ example: 1 })
  id: number;
}

class GroupSchoolDTO {
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  @ApiProperty({ example: 1 })
  id: number;
}

export class CreateGroupRequestDTO {
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_NUMBER' })
  @ApiProperty({ example: 'Group name' })
  name: string;

  @ValidateNested()
  @ApiProperty({ type: () => GroupCourseDTO })
  @Type(() => GroupCourseDTO)
  course: GroupCourseDTO;

  @ValidateNested()
  @ApiProperty({ type: () => GroupSchoolDTO })
  @Type(() => GroupSchoolDTO)
  school: GroupSchoolDTO;

  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsBoolean({ message: 'validation.INVALID_BOOLEAN' })
  @ApiProperty({ example: true })
  isActive: boolean;
}
