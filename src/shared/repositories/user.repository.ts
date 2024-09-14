import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from '@shared/entities';

@Injectable()
export class UserRepository {
  private userRepository: Repository<User>;

  constructor(private datasource: DataSource) {
    this.userRepository = datasource.getRepository(User);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async getLastCreatedUser(): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.id', 'DESC')
      .limit(1)
      .getOne();
  }
}
