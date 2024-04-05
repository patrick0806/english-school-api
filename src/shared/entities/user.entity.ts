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
}
