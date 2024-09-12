import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Course } from '@shared/entities';

@Injectable()
export class CourseRepository {
  private courseRepository: Repository<Course>;

  constructor(private datasource: DataSource) {
    this.courseRepository = datasource.getRepository(Course);
  }
}
