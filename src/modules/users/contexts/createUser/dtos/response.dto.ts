import { ApiProperty } from '@nestjs/swagger';

import { UserStatus, UserType } from '@shared/enums';

export class CreateUserResponseDTO {
  @ApiProperty({ example: 'awdjoi54ir32ediodjw' })
  id: string;

  @ApiProperty({ example: 'Jhon Doe' })
  name: string;

  @ApiProperty({ example: 'jhondoe@me.com' })
  email: string;

  @ApiProperty({ example: '19993910000' })
  phoneNumber: string;

  @ApiProperty({ example: UserType.ADMIN, enum: UserType })
  type: UserType;

  @ApiProperty({ example: 'English' })
  course: string;

  @ApiProperty({ example: 'English School' })
  school: string;

  @ApiProperty({ example: UserStatus.ACTIVE, enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
