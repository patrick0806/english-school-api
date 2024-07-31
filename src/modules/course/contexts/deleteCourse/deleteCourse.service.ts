import { Injectable } from '@nestjs/common';

import { CourseRepository } from '@shared/repositories';

@Injectable()
export class DeleteCourseService {
  constructor(private courseRepository: CourseRepository) {}

  async execute(courseId: number): Promise<void> {
    await this.courseRepository.delete(courseId);
  }
}
