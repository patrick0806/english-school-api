import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DocumentType, UserRole, UserStatus } from '@shared/enums/user';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  code: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  role: UserRole;

  @Column({ type: 'varchar', length: 20, nullable: true })
  status: UserStatus;

  @Column({ name: 'is_brasilian', type: 'boolean', nullable: false })
  isBrasilian: boolean;

  @Column({
    name: 'document_type',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  documentType: DocumentType;

  @Column({
    name: 'document_number',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  documentNumber: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
