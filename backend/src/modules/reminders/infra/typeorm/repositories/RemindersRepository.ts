import { Repository, getRepository } from 'typeorm';

// repository
import IRemindersRepository from '@modules/reminders/repositories/IRemindersRepository';

// dtos
import ICreateReminderDTO from '@modules/reminders/dtos/ICreateReminderDTO';

// entities
import Reminder from '@modules/reminders/infra/typeorm/entities/Reminder';

class RemindersRepository implements IRemindersRepository {
  private ormRepository: Repository<Reminder>;

  constructor() {
    this.ormRepository = getRepository(Reminder);
  }

  public async create(data: ICreateReminderDTO): Promise<Reminder> {
    const reminder = this.ormRepository.create(data);
    await this.ormRepository.save(reminder);
    return reminder;
  }

  public async save(reminder: Reminder): Promise<Reminder> {
    await this.ormRepository.save(reminder);
    return reminder;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findById(id: string): Promise<Reminder | undefined> {
    const reminder = await this.ormRepository.findOne({
      where: { id },
    });
    return reminder;
  }

  public async findByClassroom(classroom_id: string): Promise<Reminder[]> {
    const reminders = await this.ormRepository.find({
      where: { classroom_id },
    });
    return reminders;
  }
}

export default RemindersRepository;
