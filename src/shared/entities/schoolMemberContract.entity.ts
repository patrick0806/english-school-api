import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ContractStatus } from '@shared/enums';

import { Course } from './course.entity';
import { SchoolMember } from './schoolMember.entity';

@Entity('school_member_contracts')
export class SchoolMemberContract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SchoolMember, (schoolMember) => schoolMember.contracts)
  @JoinColumn({ name: 'school_member_id' })
  schoolMember: SchoolMember;

  @Column({ type: 'int', nullable: false })
  monthlyValue: number;

  @Column({ type: 'int', nullable: true })
  numberOfMonths: number;

  @Column({ type: 'date', default: new Date(), nullable: false })
  startDate: Date;

  @Column({ type: 'varchar', length: 20, nullable: false })
  status: ContractStatus;

  @ManyToOne(() => Course, (course) => course.contracts)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;
}
