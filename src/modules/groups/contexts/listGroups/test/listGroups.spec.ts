import { Test } from '@nestjs/testing';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { SchoolMemberRole } from '@shared/enums';
import { IRequest } from '@shared/interfaces';
import { GroupRepository } from '@shared/repositories';

import { ListGroupsController } from '../listGroups.controller';
import { ListGroupsService } from '../listGroups.service';
import { groupsListMock } from './mocks/groupsList.mock';

describe('List groups by Idcontext', () => {
  let controller: ListGroupsController;
  let service: ListGroupsService;
  let repository: GroupRepository;
  const req: IRequest = {
    user: {
      schoolId: 1,
      email: 'jhondoe@email.com',
      sub: 1,
      name: 'Jhon Doe',
      role: SchoolMemberRole.ADMIN,
    },
  } as IRequest;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [ListGroupsController],
      providers: [
        ListGroupsService,
        {
          provide: GroupRepository,
          useValue: {
            find: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ListGroupsController>(ListGroupsController);
    service = module.get<ListGroupsService>(ListGroupsService);
    repository = module.get<GroupRepository>(GroupRepository);
  });

  it('Should define a module with success', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should return a page of groups with success', async () => {
    vi.spyOn(repository, 'find').mockResolvedValue({
      content: groupsListMock,
      totalElements: groupsListMock.length,
    } as any);
    const searchParams = {
      page: 0,
      pageSize: 10,
    };

    const groupList = {
      page: searchParams.page,
      pageSize: searchParams.pageSize,
      content: groupsListMock,
      totalElements: groupsListMock.length,
      totalPages: Math.ceil(groupsListMock.length / searchParams.pageSize),
    };

    const result = await controller.handle(searchParams, req);
    expect(repository.find).toBeCalledWith(
      { page: searchParams.page, pageSize: searchParams.pageSize },
      req.user.schoolId,
      undefined,
    );
    expect(repository.find).toBeCalledTimes(1);
    expect(result).toEqual(groupList);
  });

  it('Should return a list of groups filtered by name', async () => {
    const filteredList = groupsListMock.filter((group) =>
      group.name.includes('1'),
    );
    vi.spyOn(repository, 'find').mockResolvedValue({
      content: filteredList,
      totalElements: filteredList.length,
    });

    const searchParams = {
      page: 0,
      pageSize: 10,
      name: '1',
    };

    const groupList = {
      page: searchParams.page,
      pageSize: searchParams.pageSize,
      content: filteredList,
      totalElements: filteredList.length,
      totalPages: Math.ceil(filteredList.length / searchParams.pageSize),
    };

    const result = await controller.handle(searchParams, req);
    expect(repository.find).toBeCalledWith(
      { page: searchParams.page, pageSize: searchParams.pageSize },
      req.user.schoolId,
      searchParams.name,
    );
    expect(repository.find).toBeCalledTimes(1);
    expect(result).toEqual(groupList);
    expect(result.content).toEqual(filteredList);
  });
});
