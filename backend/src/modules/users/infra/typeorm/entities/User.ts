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
import { Exclude, Expose } from 'class-transformer';

import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';
import Nursery from '@modules/nurseries/infra/typeorm/entities/Nursery';
import Role from './Role';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }

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

  @Column({ nullable: true })
  nursery_id: string;

  // many users belongs to one nursery
  @ManyToOne(() => Nursery, nursery => nursery.users)
  @JoinColumn({ name: 'nursery_id' })
  nursery: Nursery;

  // one user have many classes
  @OneToMany(() => Classroom, classroom => classroom.teacher)
  classrooms: Classroom[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
