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

export type Days = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

@Entity('reminders')
class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('enum')
  day: Days;

  @Column()
  classroom_id: string;

  // many reminders have a one classroom
  @ManyToOne(() => Classroom, classroom => classroom.reminders)
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Reminder;
