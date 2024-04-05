import { UserStatus, UserType } from '@shared/enums';

export class User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  type: UserType;
  course: string;
  school: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    type: UserType,
    course: string,
    school: string,
    status: UserStatus,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.type = type;
    this.course = course;
    this.school = school;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromFirestore(snapshot: FirebaseFirestore.DocumentData) {
    const data = snapshot.data();
    return new User(
      snapshot.id,
      data.name,
      data.email,
      data.phoneNumber,
      data.type,
      data.course,
      data.school,
      data.status,
      data.createdAt,
      data.updatedAt,
    );
  }
}
