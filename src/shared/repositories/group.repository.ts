import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Group } from '@shared/entities';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async save(group: Group): Promise<Group> {
    const savedGroup = await this.groupRepository.save(group);
    return this.groupRepository.findOne({
      where: { id: savedGroup.id },
      relations: { school: true, course: true },
    });
  }

  async findById(id: number): Promise<Group | undefined> {
    return this.groupRepository.findOne({ where: { id } });
  }

  async findByName(name: string, schoolId: number): Promise<Group | undefined> {
    return this.groupRepository.findOne({
      where: { name, school: { id: schoolId } },
    });
  }
}
