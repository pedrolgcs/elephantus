import { injectable, inject } from 'tsyringe';

// entities
import Reminder from '@modules/reminders/infra/typeorm/entities/Reminder';

// interfaces
import IRemindersRepository from '@modules/reminders/repositories/IRemindersRepository';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  classroom_id: string;
}

@injectable()
class ListRemindersByClassroomService {
  constructor(
    @inject('RemindersRepository')
    private remindersRepository: IRemindersRepository,
  ) {}

  public async execute({ classroom_id }: IRequest): Promise<Reminder[]> {
    /*
    let reminders = await this.cacheProvider.recover<Reminder>(
      `reminders-list:${classroom_id}`,
    );

    if (!reminders) {
      reminders = await this.remindersRepository.findByClassroom(classroom_id);
    }

    await this.cacheProvider.save(`reminders-list:${classroom_id}`, reminders)

    return reminders;
    */

    const reminders = await this.remindersRepository.findByClassroom(
      classroom_id,
    );

    return reminders;
  }
}

export default ListRemindersByClassroomService;
