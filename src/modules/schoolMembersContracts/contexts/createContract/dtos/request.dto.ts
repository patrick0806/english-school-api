import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { ContractStatus } from '@shared/enums';

class CreateContractCourseDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}

class CreateContractSchoolMemberDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}

export class CreateContractRequestDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 500 })
  monthlyValue: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 12 })
  numberOfMonths: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(7)
  @ApiProperty({ example: 1 })
  amountClassesWeekly: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: '2021-10-10' })
  startDate: Date;

  @IsEnum(ContractStatus)
  @ApiProperty({ example: ContractStatus.ACTIVE, enum: ContractStatus })
  status: ContractStatus;

  @ValidateNested()
  @Type(() => CreateContractCourseDTO)
  @ApiProperty({ type: CreateContractCourseDTO })
  course: CreateContractCourseDTO;

  @ValidateNested()
  @Type(() => CreateContractSchoolMemberDTO)
  @ApiProperty({ type: CreateContractSchoolMemberDTO })
  schoolMember: CreateContractSchoolMemberDTO;
}
