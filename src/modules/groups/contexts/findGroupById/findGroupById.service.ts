import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { GroupRepository } from '@shared/repositories';

import { FindGroupByIdResponseDTO } from './dtos/response.dto';

@Injectable()
export class FindGroupByIdService {
  constructor(private groupRepository: GroupRepository) {}

  async execute(groupId: number): Promise<FindGroupByIdResponseDTO> {
    const group = await this.groupRepository.findById(groupId);

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return plainToClass(FindGroupByIdResponseDTO, group);
  }
}
