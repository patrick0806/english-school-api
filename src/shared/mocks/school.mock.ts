import { School } from '@shared/entities';

export const schoolMock: School = {
  id: 1,
  name: 'School Test',
  isActive: true,
  courses: [],
  groups: [],
  SchoolMembers: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
