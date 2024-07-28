import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { SchoolMemberRole } from '@shared/enums';

class MemberSchoolDTO {
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  @ApiProperty({ example: 1 })
  id: number;
}

export class CreateSchoolMemberRequestDTO {
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    required: true,
  })
  name: string;

  @IsEmail({}, { message: 'validation.INVALID_EMAIL' })
  @ApiProperty({
    example: 'jhondoe@email.com',
    description: 'User email',
    required: true,
  })
  email: string;

  @IsOptional()
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @ApiProperty({
    example: '123456',
    description: 'User password',
    required: true,
  })
  password: string;

  @IsOptional()
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @ApiProperty({
    example: '99999999999',
    description: 'User phonenumber confirmation',
    required: true,
  })
  phoneNumber: string;

  @IsEnum(SchoolMemberRole)
  @ApiProperty({ example: SchoolMemberRole.TEACHER, enum: SchoolMemberRole })
  role: SchoolMemberRole;

  @ValidateNested()
  @Type(() => MemberSchoolDTO)
  @ApiProperty({ example: { id: 1 } })
  school: MemberSchoolDTO;
}
