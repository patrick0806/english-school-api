import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

import { SchoolMemberRole } from '@shared/enums';

import { Address } from './address.entity'; // Atualize o caminho se necessário
import { Course } from './course.entity';
import { Group } from './group.entity';
import { School } from './school.entity';
import { SchoolMemberContract } from './schoolMemberContract.entity';

@Entity('school_members')
export class SchoolMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 20, name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'user_code',
    nullable: false,
    unique: true,
  })
  userCode: string;

  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 20, nullable: false })
  role: SchoolMemberRole;

  @Column({ name: 'is_brazilian', type: 'boolean', default: false })
  isBrazilian: boolean;

  @Column({
    name: 'document_value',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  documentValue: string;

  @Column({
    name: 'document_type',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  documentType: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'foreign_country_document_name',
  })
  foreignCountryDocumentName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'foreign_country_document_value',
  })
  foreignCountryDocumentValue: string;

  @ManyToOne(() => School, (school) => school.SchoolMembers)
  @JoinColumn({ name: 'school_id' })
  school: Relation<School>;

  @OneToMany(
    () => SchoolMemberContract,
    (schoolMemberContract) => schoolMemberContract.schoolMember,
  )
  contracts: Relation<SchoolMemberContract[]>;

  @ManyToMany(() => Course, (course) => course.schoolMembers)
  @JoinTable({
    name: 'school_members_courses',
    joinColumn: { name: 'school_members_id' },
    inverseJoinColumn: { name: 'course_id' },
  })
  courses: Relation<Course[]>;

  @ManyToMany(() => Group, (group) => group.schoolMembers)
  @JoinTable({
    name: 'school_members_groups',
    joinColumn: { name: 'school_members_id' },
    inverseJoinColumn: { name: 'group_id' },
  })
  groups: Relation<Group[]>;

  @OneToOne(() => Address, (address) => address.schoolMember)
  address: Relation<Address>;

  @CreateDateColumn({ type: 'time with time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone', name: 'updated_at' })
  updatedAt: Date;
}
