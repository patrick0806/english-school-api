import { Test } from '@nestjs/testing';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { SchoolMemberRole } from '@shared/enums';
import { IRequest } from '@shared/interfaces';
import { CourseRepository } from '@shared/repositories';

import { ListCoursesController } from '../listCourses.controller';
import { ListCoursesService } from '../listCourses.service';
import { coursesListMock } from './mocks/coursesList.mock';

describe('List courses by Idcontext', () => {
  let controller: ListCoursesController;
  let service: ListCoursesService;
  let repository: CourseRepository;
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
      controllers: [ListCoursesController],
      providers: [
        ListCoursesService,
        {
          provide: CourseRepository,
          useValue: {
            find: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ListCoursesController>(ListCoursesController);
    service = module.get<ListCoursesService>(ListCoursesService);
    repository = module.get<CourseRepository>(CourseRepository);
  });

  it('Should be define a module with success', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be return a page of courses with success', async () => {
    vi.spyOn(repository, 'find').mockResolvedValue({
      content: coursesListMock,
      totalElements: coursesListMock.length,
    } as any);
    const searchParams = {
      page: 0,
      pageSize: 10,
    };

    const courseList = {
      page: searchParams.page,
      pageSize: searchParams.pageSize,
      content: coursesListMock,
      totalElements: coursesListMock.length,
      totalPages: Math.ceil(coursesListMock.length / searchParams.pageSize),
    };

    const result = await controller.handle(searchParams, req);
    expect(repository.find).toBeCalledWith(
      {
        page: searchParams.page,
        pageSize: searchParams.pageSize,
      },
      req.user.schoolId,
      undefined,
    );
    expect(repository.find).toBeCalledTimes(1);
    expect(result).toEqual(courseList);
  });

  it('Should be return a list of courses filter by name ', async () => {
    const filteredList = coursesListMock.filter((course) =>
      course.name.includes('1'),
    );
    vi.spyOn(repository, 'find').mockResolvedValue({
      content: filteredList,
      totalElements: filteredList.length,
    } as any);

    const searchParams = {
      page: 0,
      pageSize: 10,
      name: '1',
    };

    const courseList = {
      page: searchParams.page,
      pageSize: searchParams.pageSize,
      content: filteredList,
      totalElements: filteredList.length,
      totalPages: Math.ceil(filteredList.length / searchParams.pageSize),
    };

    const result = await controller.handle(searchParams, req);
    expect(repository.find).toBeCalledWith(
      {
        page: searchParams.page,
        pageSize: searchParams.pageSize,
      },
      req.user.schoolId,
      searchParams.name,
    );
    expect(repository.find).toBeCalledTimes(1);
    expect(result).toEqual(courseList);
    expect(result.content).toEqual(filteredList);
  });
});
