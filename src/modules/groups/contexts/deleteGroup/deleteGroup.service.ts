import { Injectable } from '@nestjs/common';

import { GroupRepository } from '@shared/repositories';

@Injectable()
export class DeleteGroupService {
  constructor(private groupRepository: GroupRepository) {}

  async execute(id: number): Promise<void> {
    await this.groupRepository.delete(id);
  }
}
