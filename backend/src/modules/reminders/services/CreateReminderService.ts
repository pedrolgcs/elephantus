import { injectable, inject } from 'tsyringe';

// entities
import Reminder, {
  Days,
} from '@modules/reminders/infra/typeorm/entities/Reminder';

// interfaces
import IRemindersRepository from '@modules/reminders/repositories/IRemindersRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  title: string;
  description?: string;
  day: Days;
  classroom_id: string;
}

@injectable()
class CreateReminderService {
  constructor(
    @inject('RemindersRepository')
    private reminderRepository: IRemindersRepository,
  ) {}

  public async execute({
    title,
    description,
    day,
    classroom_id,
  }: IRequest): Promise<Reminder> {
    const reminder = await this.reminderRepository.create({
      title,
      description,
      day,
      classroom_id,
    });

    /*
      await this.cacheProvider.invalidatePrefix('reminders-list');
    */

    return reminder;
  }
}

export default CreateReminderService;
