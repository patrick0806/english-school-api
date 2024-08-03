import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { SchoolMemberRole } from '@shared/enums';

class MemberSchoolDTO {
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsNumber({}, { message: 'validation.INVALID_NUMBER' })
  @ApiProperty({ example: 1 })
  id: number;
}

class MemberSchoolAddressDTO {
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'Rua das flores' })
  street: string;

  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_NUMBER' })
  @ApiProperty({ example: '68A' })
  number: string;

  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'Jardim Crepusculo' })
  neighborhood: string;

  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'São João da Boa Vista' })
  city: string;

  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'SP' })
  state: string;

  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'Brasil' })
  country: string;

  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: '123456' })
  zipCode: string;
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

  @ValidateNested()
  @Type(() => MemberSchoolAddressDTO)
  @ApiProperty({ type: MemberSchoolAddressDTO })
  address: MemberSchoolAddressDTO;

  @IsBoolean()
  @ApiProperty({ example: true })
  isBrazilian: boolean;

  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: '123456789' })
  documentValue: string;

  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'RG' })
  documentType: string;

  @IsOptional()
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'PERSONAL' })
  foreignCountryDocumentName?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  @IsString({ message: 'validation.INVALID_STRING' })
  @ApiProperty({ example: 'Brasil' })
  foreignCountryDocumentValue?: string;
}
