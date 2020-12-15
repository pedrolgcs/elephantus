import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

@Entity('notices')
class Notice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  notice: string;

  @Column('boolean')
  all: boolean;

  @Column()
  classroom_id: string;

  // many notices have a one classroom
  @ManyToOne(() => Classroom, classroom => classroom.notices)
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notice;
