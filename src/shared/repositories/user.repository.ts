import { Injectable } from '@nestjs/common';
import * as Firebase from 'firebase-admin';

import { User } from '@shared/entities';

@Injectable()
export class UserRepository {
  private firestore: Firebase.firestore.Firestore;

  constructor() {
    this.firestore = Firebase.firestore();
  }

  async save(user: User): Promise<void> {
    await this.firestore.collection('users').doc(user.id).set(user);
  }
}
