import { DataSource, Repository } from 'typeorm';

import { Course } from '@shared/entities';

export class CourseRepository {
  private courseRepository: Repository<Course>;

  constructor(private datasource: DataSource) {
    this.courseRepository = this.datasource.getRepository(Course);
  }
}
