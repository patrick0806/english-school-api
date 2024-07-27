import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SchoolMember } from '@shared/entities';

@Injectable()
export class SchoolMemberRepository {
  constructor(
    @InjectRepository(SchoolMember)
    private schoolMemberRepository: Repository<SchoolMember>,
  ) {}

  async save(schoolMember: SchoolMember): Promise<SchoolMember> {
    return this.schoolMemberRepository.save(schoolMember);
  }

  async findByEmail(email: string): Promise<SchoolMember | undefined> {
    return this.schoolMemberRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<SchoolMember | undefined> {
    return this.schoolMemberRepository.findOne({ where: { id } });
  }

  async findBySchoolId(schoolId: number): Promise<SchoolMember[]> {
    return this.schoolMemberRepository.find({
      where: { school: { id: schoolId } },
    });
  }

  async countSchoolMembers(schoolId: number): Promise<number> {
    return this.schoolMemberRepository.count({
      where: { school: { id: schoolId } },
    });
  }
}
