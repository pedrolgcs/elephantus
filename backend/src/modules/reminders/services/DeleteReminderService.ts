import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// interfaces
import IRemindersRepository from 'modules/reminders/repositories/IRemindersRepository';

interface IRequest {
  reminder_id: string;
}

@injectable()
class DeleteNoticeService {
  constructor(
    @inject('RemindersRepository')
    private remindersRepository: IRemindersRepository,
  ) {}

  public async execute({ reminder_id }: IRequest): Promise<void> {
    const reminder = await this.remindersRepository.findById(reminder_id);

    if (!reminder) {
      throw new AppError('Reminder not found', 400);
    }

    await this.remindersRepository.deleteById(reminder_id);
  }
}

export default DeleteNoticeService;
