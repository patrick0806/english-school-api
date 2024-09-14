import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { User } from '@shared/entities';
import { UserRole } from '@shared/enums/user';
import { UserRepository } from '@shared/repositories';

import { CreateUserRequestDTO } from './dtos/request.dto';
import { CreateUserResponsetDTO } from './dtos/response.dto';

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(
    userData: CreateUserRequestDTO,
  ): Promise<CreateUserResponsetDTO> {
    const userExists = await this.userRepository.findByEmail(userData.email);
    if (userExists) {
      throw new ConflictException({
        error: 'Conflict',
        message: 'User already exists',
      });
    }
    const amountUsers = await this.userRepository.getLastCreatedUser();
    const savedUser = await this.userRepository.save(
      plainToClass(User, {
        ...userData,
        code: this.generateCode(
          userData.name,
          userData.role,
          amountUsers.id || 0,
        ),
      }),
    );
    return plainToClass(CreateUserResponsetDTO, savedUser);
  }

  private generateCode(name: string, role: UserRole, amountUsers: number) {
    const shortName = name
      .split(' ')
      .map((word) => word.at(0).toUpperCase())
      .join('');
    let roleCode: string;

    switch (role) {
      case UserRole.ADMIN:
        roleCode = 'A';
        break;
      case UserRole.TEACHER:
        roleCode = 'T';
        break;
      case UserRole.STUDENT:
        roleCode = 'S';
        break;
    }

    let userNumberCode: string;
    amountUsers += 1;
    if (amountUsers < 10) {
      userNumberCode = `000${amountUsers}`;
    } else if (amountUsers < 100) {
      userNumberCode = `00${amountUsers}`;
    } else if (amountUsers < 1000) {
      userNumberCode = `0${amountUsers}`;
    } else {
      userNumberCode = `${amountUsers}`;
    }

    return `${userNumberCode}-${shortName}${roleCode}`;
  }
}
