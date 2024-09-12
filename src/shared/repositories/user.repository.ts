import { DataSource, Repository } from 'typeorm';

import { User } from '@shared/entities';

export class UserRepository {
  private userRepository: Repository<User>;

  constructor(private datasource: DataSource) {
    this.userRepository = this.datasource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
