import AppError from '@shared/errors/AppError';

// fakes
import FakeRemindersRepository from '@modules/reminders/repositories/fakes/FakeRemindersRepository';

// service
import CreateReminderService from './CreateReminderService';

let createReminder: CreateReminderService;
let fakeRemindersRepository: FakeRemindersRepository;

describe('CreateReminder', () => {
  beforeEach(() => {
    fakeRemindersRepository = new FakeRemindersRepository();
    createReminder = new CreateReminderService(fakeRemindersRepository);
  });

  it('should be able to create a new reminder', async () => {
    const reminder = await createReminder.execute({
      title: 'Maçã',
      description: 'Levar maçã cortada',
      day: 'Mon',
      classroom_id: 'classroom_id',
    });

    expect(reminder).toHaveProperty('id');
    expect(reminder.title).toBe('Maçã');
  });

  it('should not be able to create a new reminder out of a list of days', async () => {
    await expect(
      createReminder.execute({
        title: 'Maçã',
        description: 'Levar maçã cortada',
        day: 'Mon',
        classroom_id: 'classroom_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
