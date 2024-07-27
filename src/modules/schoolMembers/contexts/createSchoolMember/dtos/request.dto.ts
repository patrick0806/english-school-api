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

class SchoolDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}

export class CreateSchoolMemberRequestDTO {
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    required: true,
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'jhondoe@email.com',
    description: 'User email',
    required: true,
  })
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
    description: 'User password',
    required: true,
  })
  password: string;

  @IsOptional()
  @IsNotEmpty()
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
  @Type(() => SchoolDTO)
  @ApiProperty({ example: { id: 1 } })
  school: SchoolDTO;
}
