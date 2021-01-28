import AppError from '@shared/errors/AppError';

// fakes
import FakeRemindersRepository from '@modules/reminders/repositories/fakes/FakeRemindersRepository';

// service
import UpdateReminderService from './UpdateReminderService';

let fakeRemindersRepository: FakeRemindersRepository;
let updateReminder: UpdateReminderService;

describe('UpdateNotice', () => {
  beforeEach(() => {
    fakeRemindersRepository = new FakeRemindersRepository();
    updateReminder = new UpdateReminderService(fakeRemindersRepository);
  });

  it('should be able update a Reminder by ID', async () => {
    const reminder = await fakeRemindersRepository.create({
      title: 'Notice 01',
      description: 'take apple',
      day: 'Mon',
      classroom_id: 'classroom_id',
    });

    await updateReminder.execute({
      reminder_id: reminder.id,
      title: 'Reminder updated',
      description: 'buy apple',
    });

    expect(reminder.title).toBe('Reminder updated');
    expect(reminder.description).toBe('buy apple');
  });

  it('should not be able to update a reminder with non existing id', async () => {
    await expect(
      updateReminder.execute({
        reminder_id: 'non-existing-reminder',
        title: 'New Title',
        description: 'New description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
