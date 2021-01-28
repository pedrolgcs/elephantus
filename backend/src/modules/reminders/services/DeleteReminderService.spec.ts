import AppError from '@shared/errors/AppError';

// fakes
import FakeRemindersRepository from '@modules/reminders/repositories/fakes/FakeRemindersRepository';

// service
import DeleteReminderService from './DeleteReminderService';

let fakeRemindersRepository: FakeRemindersRepository;
let deleteReminder: DeleteReminderService;

describe('DeleteReminder', () => {
  beforeEach(() => {
    fakeRemindersRepository = new FakeRemindersRepository();
    deleteReminder = new DeleteReminderService(fakeRemindersRepository);
  });

  it('should be able to delete a reminder by ID', async () => {
    const reminder = await fakeRemindersRepository.create({
      title: 'Buy Apple',
      description: 'Eat apple before sleep',
      day: 'Mon',
      classroom_id: 'classroom_id',
    });

    await expect(
      deleteReminder.execute({ reminder_id: reminder.id }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete a reminder on non existing id', async () => {
    await expect(
      deleteReminder.execute({
        reminder_id: 'non-existing-reminder',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
