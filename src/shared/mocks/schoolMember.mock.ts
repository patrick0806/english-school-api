import { School, SchoolMember } from '@shared/entities';
import { Address } from '@shared/entities/address.entity';
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
  isBrazilian: true,
  documentValue: '123456789',
  documentType: 'RG',
  foreignCountryDocumentName: null,
  foreignCountryDocumentValue: null,
  school: {
    id: 1,
    name: 'School Name',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as School,
  address: {
    id: 1,
    street: 'Street Name',
    number: '123',
    neighborhood: 'Neighborhood Name',
    city: 'City Name',
    state: 'State Name',
    zipCode: '12345678',
  } as Address,
  contracts: [],
  courses: [],
  groups: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
