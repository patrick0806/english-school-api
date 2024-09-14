import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { CourseDTO } from '@shared/dtos';
import { CourseRepository } from '@shared/repositories';

import { ListCourseRequestDTO } from '../dtos/request.dto';
import { ListCourseService } from '../listCourse.service';

describe('ListCourseService', () => {
  let listCourseService: ListCourseService;
  let courseRepository: CourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListCourseService,
        {
          provide: CourseRepository,
          useValue: {
            findAll: vi.fn(),
          },
        },
      ],
    }).compile();

    listCourseService = module.get<ListCourseService>(ListCourseService);
    courseRepository = module.get<CourseRepository>(CourseRepository);
  });

  it('should be defined', () => {
    expect(listCourseService).toBeDefined();
    expect(courseRepository).toBeDefined();
  });

  describe('execute method', () => {
    it('should return a list of courses', async () => {
      const query: ListCourseRequestDTO = { page: 0, pageSize: 10 };
      const courseData = [
        {
          id: 1,
          name: 'Course 1',
          description: 'Description 1',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Course 2',
          description: 'Description 2',
          status: 'INACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const paginatedResult = {
        content: courseData,
        totalPages: 1,
        page: 0,
        pageSize: 10,
        total: 2,
      };

      vi.spyOn(courseRepository, 'findAll').mockResolvedValue(paginatedResult);

      const result = await listCourseService.execute(query);

      expect(courseRepository.findAll).toHaveBeenCalledTimes(1);
      expect(courseRepository.findAll).toHaveBeenCalledWith(query);
      expect(result.content).toEqual(plainToClass(CourseDTO, courseData));
    });
  });
});
