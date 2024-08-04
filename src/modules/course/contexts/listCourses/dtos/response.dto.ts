import { ApiProperty } from '@nestjs/swagger';

import { CourseDTO } from '@shared/dtos';
import { IPageResult } from '@shared/interfaces';

export class ListCoursesResponseDTO implements IPageResult<CourseDTO> {
  @ApiProperty({ example: 0, description: 'Page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Items per page' })
  pageSize: number;

  @ApiProperty({ example: 1, description: 'Total pages' })
  totalPages: number;

  @ApiProperty({ example: 1, description: 'Total Elements' })
  totalElements: number;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'English 1',
        description: 'Basic English course',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    description: 'Courses',
  })
  content: CourseDTO[];
}
