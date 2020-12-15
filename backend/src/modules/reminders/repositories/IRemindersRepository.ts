import Reminder from '../infra/typeorm/entities/Reminder';

// dtos
import ICreateReminderDTO from '../dtos/ICreateReminderDTO';

export default interface IRemindersRepository {
  create(data: ICreateReminderDTO): Promise<Reminder>;
  save(reminder: Reminder): Promise<Reminder>;
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<Reminder | undefined>;
  findByClassroom(id: string): Promise<Reminder[]>;
}
