import { injectable, inject } from 'tsyringe';

// entities
import Reminder from '@modules/reminders/infra/typeorm/entities/Reminder';

// interfaces
import IRemindersRepository from '@modules/reminders/repositories/IRemindersRepository';

interface IRequest {
  classroom_id: string;
}

@injectable()
class ListRemindersService {
  constructor(
    @inject('RemindersRepository')
    private remindersRepository: IRemindersRepository,
  ) {}

  public async execute({ classroom_id }: IRequest): Promise<Reminder[]> {
    const reminders = await this.remindersRepository.findByClassroom(
      classroom_id,
    );
    return reminders;
  }
}

export default ListRemindersService;
