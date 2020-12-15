import { v4 } from 'uuid';

// entities
import Reminder from '@modules/reminders/infra/typeorm/entities/Reminder';

// dtos
import ICreateReminderDTO from '@modules/reminders/dtos/ICreateReminderDTO';

// repository
import IRemindersRepository from 'modules/reminders/repositories/IRemindersRepository';

class FakeRemindersRepository implements IRemindersRepository {
  private reminders: Reminder[] = [];

  public async create(data: ICreateReminderDTO): Promise<Reminder> {
    const reminder = new Reminder();
    Object.assign(reminder, { id: v4() }, data);
    this.reminders.push(reminder);
    return reminder;
  }

  public async save(reminder: Reminder): Promise<Reminder> {
    const findIndex = this.reminders.findIndex(
      element => element.id === reminder.id,
    );
    this.reminders[findIndex] = reminder;
    return reminder;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.reminders.findIndex(reminder => reminder.id === id);
    this.reminders.splice(findIndex, 1);
  }

  public async findById(id: string): Promise<Reminder | undefined> {
    const reminder = this.reminders.find(element => element.id === id);
    return reminder;
  }

  public async findByClassroom(classroom_id: string): Promise<Reminder[]> {
    const reminders = this.reminders.filter(
      reminder => reminder.classroom_id === classroom_id,
    );
    return reminders;
  }
}
export default FakeRemindersRepository;
