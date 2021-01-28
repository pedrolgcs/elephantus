import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Reminder from 'modules/reminders/infra/typeorm/entities/Reminder';

// interfaces
import IRemindersRepository from 'modules/reminders/repositories/IRemindersRepository';

interface IRequest {
  reminder_id: string;
  title: string;
  description: string;
}

@injectable()
class UpdateReminderService {
  constructor(
    @inject('RemindersRepository')
    private remindersRepository: IRemindersRepository,
  ) {}

  public async execute({
    reminder_id,
    title,
    description,
  }: IRequest): Promise<Reminder> {
    const existingReminder = await this.remindersRepository.findById(
      reminder_id,
    );

    if (!existingReminder) {
      throw new AppError('Reminder not found', 400);
    }

    const updatedReminder = Object.assign(existingReminder, {
      title,
      description,
    });

    await this.remindersRepository.save(updatedReminder);

    return updatedReminder;
  }
}

export default UpdateReminderService;
