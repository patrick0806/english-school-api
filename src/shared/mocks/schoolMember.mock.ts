import { School, SchoolMember } from '@shared/entities';
import { SchoolMemberRole } from '@shared/enums';

export const schoolMemberMock: SchoolMember = {
  id: 1,
  name: 'Jhon Doe',
  email: 'jhondoe@email.com',
  password: '$2b$10$P7zoVoqg6Lie1QSbEN9JzO5jq5gcGHH/uicReBR2hU8AldzfEJqJO',
  role: SchoolMemberRole.TEACHER,
  isActive: true,
  phoneNumber: '123456789',
  userCode: '123456',
  school: {
    id: 1,
    name: 'School Name',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as School,
  contracts: [],
  courses: [],
  groups: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
