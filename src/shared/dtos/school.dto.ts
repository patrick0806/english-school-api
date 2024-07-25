import { ApiProperty } from '@nestjs/swagger';

export class SchoolDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'School name' })
  name: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
  updatedAt: Date;
}
