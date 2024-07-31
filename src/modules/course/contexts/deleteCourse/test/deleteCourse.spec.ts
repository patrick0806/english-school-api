import { Test } from '@nestjs/testing';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { CourseRepository } from '@shared/repositories';

import { DeleteCourseController } from '../deleteCourse.controller';
import { DeleteCourseService } from '../deleteCourse.service';

describe('Delete course context', () => {
  let controller: DeleteCourseController;
  let service: DeleteCourseService;
  let repository: CourseRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [DeleteCourseController],
      providers: [
        DeleteCourseService,
        {
          provide: CourseRepository,
          useValue: {
            delete: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeleteCourseController>(DeleteCourseController);
    service = module.get<DeleteCourseService>(DeleteCourseService);
    repository = module.get<CourseRepository>(CourseRepository);
  });

  it('Should be define a module with success', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should be delete a course with success', async () => {
    const courseId = 1;

    vi.spyOn(repository, 'delete').mockResolvedValue();

    const result = await controller.handle(courseId);
    expect(repository.delete).toBeCalledWith(courseId);
    expect(repository.delete).toBeCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
