import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SchoolMemberContract } from '@shared/entities';

@Injectable()
export class SchoolMemberContracRepository {
  constructor(
    @InjectRepository(SchoolMemberContract)
    private readonly repository: Repository<SchoolMemberContract>,
  ) {}

  async findAll(): Promise<SchoolMemberContract[]> {
    return this.repository.find();
  }

  async findBySchoolMemberIdAndCourse(
    schoolMemberId: number,
    courseId: number,
  ): Promise<SchoolMemberContract> {
    return this.repository.findOne({
      where: {
        schoolMember: { id: schoolMemberId },
        course: { id: courseId },
      },
    });
  }

  async findById(id: number): Promise<SchoolMemberContract> {
    return this.repository.findOne({ where: { id } });
  }

  async save(data: SchoolMemberContract): Promise<SchoolMemberContract> {
    return this.repository.save(data);
  }
}
