import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Group } from '@shared/entities';
import { IPage, IPageResult } from '@shared/interfaces';

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

  async delete(id: number): Promise<void> {
    await this.groupRepository.delete(id);
  }

  async findById(id: number): Promise<Group | undefined> {
    return this.groupRepository.findOne({
      where: { id },
      relations: {
        school: true,
        schoolMembers: true,
      },
    });
  }

  async findByName(name: string, schoolId: number): Promise<Group | undefined> {
    return this.groupRepository.findOne({
      where: { name, school: { id: schoolId } },
    });
  }

  async find(
    { page, pageSize }: IPage,
    schoolId: number,
    name: string,
  ): Promise<IPageResult<Group>> {
    const conditions = {
      school: { id: schoolId },
    };

    if (name) {
      conditions['name'] = Like(`%${name}%`);
    }
    const [content, totalElements] = await this.groupRepository.findAndCount({
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
