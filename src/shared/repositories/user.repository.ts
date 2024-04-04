import { Injectable } from '@nestjs/common';
import * as Firebase from 'firebase-admin';

@Injectable()
export class UserRepository {
  private firestore: Firebase.firestore.Firestore;

  constructor() {
    this.firestore = Firebase.firestore();
  }

  async save(user: any) {
    //TODO - remove any
    return this.firestore.collection('users').doc(user.uid).set(user);
  }
}
