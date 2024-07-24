import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

import { Course } from './course.entity';
import { Group } from './group.entity';
import { SchoolMember } from './schoolMember.entity';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, type: 'varchar', length: 70 })
  name: string;

  @Column({ name: 'is_active', nullable: false, default: true })
  isActivate: boolean;

  @OneToMany(() => SchoolMember, (SchoolMember) => SchoolMember.school)
  SchoolMembers: Relation<SchoolMember[]>;

  @OneToMany(() => Course, (course) => course.school)
  courses: Relation<Course[]>;

  @OneToMany(() => Group, (group) => group.school)
  groups: Relation<Group[]>;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;
}
