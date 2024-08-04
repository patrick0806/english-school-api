import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { groupMock } from '@shared/mocks';
import { GroupRepository } from '@shared/repositories';

import { FindGroupByIdResponseDTO } from '../dtos/response.dto';
import { FindGroupByIdController } from '../findGroupById.controller';
import { FindGroupByIdService } from '../findGroupById.service';

describe('Find course by Idcontext', () => {
  let controller: FindGroupByIdController;
  let service: FindGroupByIdService;
  let repository: GroupRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [FindGroupByIdController],
      providers: [
        FindGroupByIdService,
        {
          provide: GroupRepository,
          useValue: {
            findById: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FindGroupByIdController>(FindGroupByIdController);
    service = module.get<FindGroupByIdService>(FindGroupByIdService);
    repository = module.get<GroupRepository>(GroupRepository);
  });

  it('Should be define a module with success', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be find a group with success', async () => {
    const groupId = 1;

    vi.spyOn(repository, 'findById').mockResolvedValue(groupMock);

    const result = await controller.handle(groupId);
    expect(repository.findById).toBeCalledWith(groupId);
    expect(repository.findById).toBeCalledTimes(1);
    expect(result).toEqual(plainToClass(FindGroupByIdResponseDTO, groupMock));
  });

  it('Should be return an error when group not found', async () => {
    const groupId = 1;

    vi.spyOn(repository, 'findById').mockResolvedValue(null);

    try {
      await controller.handle(groupId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Group not found');
    }
  });
});
