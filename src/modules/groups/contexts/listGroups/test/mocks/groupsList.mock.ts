import { Group } from '@shared/entities';

export const groupsListMock: Group[] = [
  {
    id: 1,
    name: 'Group 1',
    isActive: true,
    course: {
      id: 1,
      name: 'Course 1',
      description: 'Description 1',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      users: null,
    },
    users: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Group 2',
    isActive: true,
    course: {
      id: 2,
      name: 'Course 2',
      description: 'Description 2',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      users: null,
    },
    users: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more groups with courses here...
];
