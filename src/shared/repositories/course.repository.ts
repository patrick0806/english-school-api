import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Course } from '@shared/entities';
import { IPage } from '@shared/interfaces/page.interface';

type FindAllParams = {
  page: number;
  pageSize: number;
};

@Injectable()
export class CourseRepository {
  private courseRepository: Repository<Course>;

  constructor(private datasource: DataSource) {
    this.courseRepository = datasource.getRepository(Course);
  }

  async save(course: Course): Promise<Course> {
    return this.courseRepository.save(course);
  }

  async findById(id: number): Promise<Course> {
    return this.courseRepository.findOneBy({ id });
  }

  async findAll(searchParams: FindAllParams): Promise<IPage<Course>> {
    const [content, total] = await this.courseRepository.findAndCount({
      skip: searchParams.page * searchParams.pageSize,
      take: searchParams.pageSize,
      order: {
        name: 'ASC',
      },
    });

    return {
      content,
      totalPages: Math.ceil(total / searchParams.pageSize),
      page: searchParams.page,
      pageSize: searchParams.pageSize,
    };
  }
}
