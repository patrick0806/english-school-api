import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

import { Group } from './group.entity';
import { School } from './school.entity';
import { SchoolMember } from './schoolMember.entity';
import { SchoolMemberContract } from './schoolMemberContract.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  description: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @OneToMany(() => Group, (group) => group.course)
  groups: Relation<Group[]>;

  @OneToMany(
    () => SchoolMemberContract,
    (schoolMemberContract) => schoolMemberContract.course,
  )
  contracts: SchoolMemberContract[];

  @ManyToMany(() => SchoolMember, (SchoolMember) => SchoolMember.courses)
  @JoinTable({
    name: 'school_members_courses',
    joinColumn: { name: 'school_members_id' },
    inverseJoinColumn: { name: 'course_id' },
  })
  schoolMembers: Relation<SchoolMember[]>;

  @ManyToOne(() => School, (school) => school.courses)
  @JoinColumn({ name: 'school_id' })
  school: Relation<School>;

  @CreateDateColumn({ type: 'time with time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone', name: 'updated_at' })
  updatedAt: Date;
}
