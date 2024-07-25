import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

import { Course } from './course.entity';
import { School } from './school.entity';
import { SchoolMember } from './schoolMember.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Relation<Course>;

  @ManyToOne(() => School, (school) => school.courses)
  @JoinColumn({ name: 'school_id' })
  school: Relation<School>;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToMany(() => SchoolMember, (schoolMember) => schoolMember.groups)
  @JoinTable({
    name: 'school_members_groups',
    joinColumn: { name: 'group_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  schoolMembers: Relation<SchoolMember[]>;

  @CreateDateColumn({ type: 'time with time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone', name: 'updated_at' })
  updatedAt: Date;
}
