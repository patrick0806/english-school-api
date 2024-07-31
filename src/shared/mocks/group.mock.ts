import { Course, Group, School } from '@shared/entities';

export const groupMock: Group = {
  id: 1,
  name: 'Group Name',
  isActive: true,
  course: {
    id: 1,
    name: 'Course Name',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Course,
  school: {
    id: 1,
    name: 'School Name',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as School,
  schoolMembers: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
