import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { User } from '@shared/entities';
import { UserRole } from '@shared/enums/user';

import { CreateUserController } from '../createUser.controller';
import { CreateUserService } from '../createuser.service';
import { CreateUserRequestDTO } from '../dtos/request.dto';

describe('CreateUserController', () => {
  let createUserController: CreateUserController;
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: {
            execute: vi.fn(),
          },
        },
      ],
    }).compile();

    createUserController =
      module.get<CreateUserController>(CreateUserController);
    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(createUserController).toBeDefined();
    expect(createUserService).toBeDefined();
  });

  describe('handler method', () => {
    it('should call the service with the correct data', async () => {
      const userData = {
        name: 'New User',
        email: 'new@example.com',
        role: UserRole.ADMIN,
      } as CreateUserRequestDTO;

      const mockResult = {
        id: 1,
        code: '001-N-U-A',
        name: 'New User',
        email: 'new@example.com',
        role: UserRole.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      vi.spyOn(createUserService, 'execute').mockResolvedValue(mockResult);

      const result = await createUserController.handler(userData);

      expect(createUserService.execute).toHaveBeenCalledTimes(1);
      expect(createUserService.execute).toHaveBeenCalledWith(userData);
      expect(result).toEqual(mockResult);
    });

    it('should throw ConflictException when service fails', async () => {
      const userData = {
        name: 'Existing User',
        email: 'existing@example.com',
        role: UserRole.TEACHER,
      } as CreateUserRequestDTO;

      vi.spyOn(createUserService, 'execute').mockRejectedValue(
        new ConflictException('Email already exists'),
      );

      await expect(createUserController.handler(userData)).rejects.toThrowError(
        ConflictException,
      );
      expect(createUserService.execute).toHaveBeenCalledTimes(1);
      expect(createUserService.execute).toHaveBeenCalledWith(userData);
    });
  });
});
