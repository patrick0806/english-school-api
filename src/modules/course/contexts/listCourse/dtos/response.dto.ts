import { CourseDTO } from '@shared/dtos';
import { IPage } from '@shared/interfaces/page.interface';

export class ListCourseResponseDTO implements IPage<CourseDTO> {
  totalPages: number;
  page: number;
  pageSize: number;
  content: CourseDTO[];
}
