import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';
import Role from './Role';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role_id: string;

  // many users have one role
  @ManyToOne(() => Role, role => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  // one user have many classes
  @OneToMany(() => Classroom, classroom => classroom.user, { eager: true })
  classrooms: Classroom[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
