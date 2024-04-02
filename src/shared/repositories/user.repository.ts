import { Injectable } from '@nestjs/common';

import { database } from '@config/database';

@Injectable()
export class UserRepository {
  private users = database.collection('users');

  async save(user: { name: string; email: string }) {
    return this.users.insertOne(user);
  }

  async findByEmail(email: string) {
    return this.users.findOne({ email });
  }
}
