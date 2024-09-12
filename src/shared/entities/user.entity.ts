import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar', length: 20, nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  role: UserRole;

  @Column({ type: 'varchar', length: 20, nullable: true })
  status: UserStatus;

  @Column({ type: 'boolean', nullable: false })
  isBrasilian: boolean;

  @Column({ type: 'varchar', length: 20, nullable: true })
  documentType: DocumentType;

  @Column({ type: 'varchar', length: 20, nullable: true })
  documentNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
