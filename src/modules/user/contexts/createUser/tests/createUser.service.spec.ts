import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { User } from '@shared/entities';
import { UserRole } from '@shared/enums/user';
import { UserRepository } from '@shared/repositories';

import { CreateUserService } from '../createuser.service';
import { CreateUserRequestDTO } from '../dtos/request.dto';

vi.mock('@shared/utils', () => ({
  HashUtils: {
    generateHash: vi.fn(),
  },
}));

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: vi.fn(),
            getLastCreatedUser: vi.fn(),
            save: vi.fn(),
          },
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(createUserService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('execute method', () => {
    it('should create a new user when email does not exist', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.ADMIN,
      } as CreateUserRequestDTO;
      const lastUser = { id: 1 } as User;
      const savedUser = new User();
      savedUser.id = 2;
      savedUser.code = '001-JD-A';

      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      vi.spyOn(userRepository, 'getLastCreatedUser').mockResolvedValue(
        lastUser,
      );
      vi.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

      const result = await createUserService.execute(userData);

      expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(userRepository.getLastCreatedUser).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('id', 2);
      expect(result).toHaveProperty('code', '001-JD-A');
    });

    it('should throw ConflictException when email already exists', async () => {
      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        role: UserRole.TEACHER,
      } as CreateUserRequestDTO;

      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(new User());

      await expect(createUserService.execute(userData)).rejects.toThrowError(
        ConflictException,
      );
      expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    });

    it('should generate correct code for new user', async () => {
      const userData = {
        name: 'Alice Smith Johnson',
        email: 'alice@example.com',
        role: UserRole.STUDENT,
      } as CreateUserRequestDTO;
      const lastUser = { id: 123 } as User;
      const expectedCode = '0124-ASJ-S';

      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      vi.spyOn(userRepository, 'getLastCreatedUser').mockResolvedValue(
        lastUser,
      );
      vi.spyOn(userRepository, 'save').mockResolvedValue({
        code: expectedCode,
      } as User);

      const result = await createUserService.execute(userData);

      expect(result).toHaveProperty('code', expectedCode);
    });
  });
});
