import { Course, School } from '@shared/entities';

export const courseMock: Course = {
  id: 1,
  name: 'Course 1',
  description: 'Description of course 1',
  isActive: true,
  schoolMembers: [],
  school: {
    id: 1,
    name: 'School 1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as School,
  contracts: [],
  groups: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
