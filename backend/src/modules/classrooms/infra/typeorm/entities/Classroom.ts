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

import User from '@modules/users/infra/typeorm/entities/User';
import Notice from '@modules/notices/infra/typeorm/entities/notice';

@Entity('classrooms')
class Classroom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('enum')
  shift: 'morning' | 'afternoon' | 'night';

  @Column()
  user_id: string;

  // many classes have a one user [teacher]
  @ManyToOne(() => User, user => user.classrooms)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // one classroom have a many notices
  @OneToMany(() => Notice, notice => notice.classroom)
  notices: Notice[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Classroom;
