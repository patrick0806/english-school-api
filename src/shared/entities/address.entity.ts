import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { SchoolMember } from './schoolMember.entity'; // Atualize o caminho se necessário

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  street: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  number: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  neighborhood: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  state: string;

  @Column({ name: 'zip_code', type: 'varchar', length: 20, nullable: false })
  zipCode: string;

  @OneToOne(() => SchoolMember, (schoolMember) => schoolMember.address)
  @JoinColumn({ name: 'school_member_id' })
  schoolMember: Relation<SchoolMember>;
}
