import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { I18nService } from 'nestjs-i18n';
import assert from 'node:assert';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { groupMock } from '@shared/mocks';
import { GroupRepository } from '@shared/repositories';

import { CreateGroupController } from '../createGroup.controller';
import { CreateGroupService } from '../createGroup.service';
import { CreateGroupResponseDTO } from '../dtos/response.dto';

vi.mock('nestjs-i18n', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    I18nService: { translate: vi.fn() },
    I18nContext: {
      current: vi.fn(() => ({
        lang: 'en',
      })),
    },
  };
});

describe('Create Group Context', () => {
  let controller: CreateGroupController;
  let service: CreateGroupService;
  let repository: GroupRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [CreateGroupController],
      providers: [
        CreateGroupService,
        {
          provide: I18nService,
          useValue: {
            translate: vi.fn().mockReturnValue('Entity already exists'),
          },
        },
        {
          provide: GroupRepository,
          useValue: {
            findByName: vi.fn(),
            save: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateGroupController>(CreateGroupController);
    service = module.get<CreateGroupService>(CreateGroupService);
    repository = module.get<GroupRepository>(GroupRepository);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create a group with success', async () => {
    vi.spyOn(repository, 'findByName').mockResolvedValue(null);
    vi.spyOn(repository, 'save').mockResolvedValue(groupMock);

    const requestDTO = {
      name: groupMock.name,
      course: groupMock.course,
      school: groupMock.school,
      isActive: groupMock.isActive,
    };

    const result = await controller.handle(requestDTO);

    expect(repository.findByName).toBeCalledTimes(1);
    expect(repository.findByName).toHaveBeenCalledWith(
      groupMock.name,
      groupMock.school.id,
    );
    expect(repository.save).toBeCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(requestDTO);
    expect(
      assert.deepStrictEqual(
        result,
        plainToClass(CreateGroupResponseDTO, groupMock),
        'GroupeDTO are not equal',
      ),
    ).toBeUndefined();
  });

  it('should not create a group with an existing name', async () => {
    vi.spyOn(repository, 'findByName').mockResolvedValue(groupMock);

    const requestDTO = {
      name: groupMock.name,
      course: groupMock.course,
      school: groupMock.school,
      isActive: groupMock.isActive,
    };

    try {
      await controller.handle(requestDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe('Entity already exists');
    }
  });
});
