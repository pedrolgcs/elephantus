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
});
