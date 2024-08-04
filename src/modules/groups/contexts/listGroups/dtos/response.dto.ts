import { ApiProperty } from '@nestjs/swagger';

import { GroupDTO } from '@shared/dtos';
import { IPage } from '@shared/interfaces';

export class ListGroupsResponseDTO implements IPage<GroupDTO> {
  @ApiProperty({ example: 0, description: 'Page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Items per page' })
  pageSize: number;

  @ApiProperty({ example: 1, description: 'Total pages' })
  totalPages: number;

  @ApiProperty({ example: 1, description: 'Total Elements' })
  totalElements: number;

  @ApiProperty({
    example: [GroupDTO],
    type: [GroupDTO],
    description: 'Groups',
  })
  content: GroupDTO[];
}
