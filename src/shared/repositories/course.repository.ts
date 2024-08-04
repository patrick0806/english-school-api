import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Course } from '@shared/entities';
import { IPage, IPageResult } from '@shared/interfaces';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private repository: Repository<Course>,
  ) {}

  async save(course: Course): Promise<Course> {
    return this.repository.save(course);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: number): Promise<Course> {
    return this.repository.findOne({
      where: { id },
      relations: {
        schoolMembers: true,
        school: true,
      },
    });
  }

  async findByName(name: string, schoolId: number): Promise<Course> {
    return this.repository.findOne({
      where: { name, school: { id: schoolId } },
      relations: {
        schoolMembers: true,
        school: true,
      },
    });
  }

  async find(
    { page, pageSize }: IPage,
    schoolId: number,
    name: string,
  ): Promise<IPageResult<Course>> {
    const conditions = {
      school: { id: schoolId },
    };

    if (name) {
      conditions['name'] = Like(`%${name}%`);
    }
    const [content, totalElements] = await this.repository.findAndCount({
      where: conditions,
      skip: Math.max(0, (page - 1) * pageSize),
      take: pageSize,
    });
    return {
      content,
      totalElements,
    };
  }
}
