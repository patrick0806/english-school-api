import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { GroupDTO } from '@shared/dtos';
import { IDecodedToken } from '@shared/interfaces';
import { GroupRepository } from '@shared/repositories';

import { ListGroupsRequestDTO } from './dtos/request.dto';
import { ListGroupsResponseDTO } from './dtos/response.dto';

@Injectable()
export class ListGroupsService {
  constructor(private groupRepository: GroupRepository) {}

  async execute(
    { page, pageSize, name }: ListGroupsRequestDTO,
    sessionUserData: IDecodedToken,
  ): Promise<ListGroupsResponseDTO> {
    const { content, totalElements } = await this.groupRepository.find(
      {
        page,
        pageSize,
      },
      sessionUserData.schoolId,
      name,
    );
    return {
      page,
      pageSize,
      totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      content: content.map((group) => plainToClass(GroupDTO, group)),
    };
  }
}
