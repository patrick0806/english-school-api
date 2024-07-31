import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { Group } from '@shared/entities';
import { GroupRepository } from '@shared/repositories';

import { CreateGroupRequestDTO } from './dtos/request.dto';
import { CreateGroupResponseDTO } from './dtos/response.dto';

@Injectable()
export class CreateGroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private i18n: I18nService,
  ) {}

  async execute(
    groupData: CreateGroupRequestDTO,
  ): Promise<CreateGroupResponseDTO> {
    const groupALreadyExists = await this.groupRepository.findByName(
      groupData.name,
      groupData.school.id,
    );

    if (groupALreadyExists) {
      throw new ConflictException({
        error: this.i18n.translate('exceptions.error.CONFLICT_ENTITY', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.translate('exceptions.message.CONFLICT_ENTITY', {
          args: {
            entityName: 'Group',
            propertyValue: groupData.name,
          },
          lang: I18nContext.current().lang,
        }),
      });
    }

    const savedGroup = await this.groupRepository.save(
      plainToClass(Group, groupData),
    );

    return plainToClass(CreateGroupResponseDTO, savedGroup);
  }
}
