import { v4 as uuidv4 } from 'uuid';

// fakes
import FakeRemindersRepository from '@modules/reminders/repositories/fakes/FakeRemindersRepository';

// service
import ListRemindersService from './ListRemindersService';

// helpers
import ReminderBuilder from '../helpers/ReminderBuilder';

let listReminders: ListRemindersService;
let fakeRemindersRepository: FakeRemindersRepository;

describe('ListReminders', () => {
  beforeEach(() => {
    fakeRemindersRepository = new FakeRemindersRepository();
    listReminders = new ListRemindersService(fakeRemindersRepository);
  });

  it('should be able to list all reminders by classroom_id', async () => {
    const reminderData = new ReminderBuilder(uuidv4()).build();
    const reminderOtherClassroom = new ReminderBuilder(uuidv4())
      .setClassroomId('other_classroom_id')
      .build();

    const reminder_01 = await fakeRemindersRepository.create(reminderData);
    const reminder_02 = await fakeRemindersRepository.create(reminderData);
    const reminder_03 = await fakeRemindersRepository.create(reminderData);
    await fakeRemindersRepository.create(reminderOtherClassroom);

    const reminders = await listReminders.execute({
      classroom_id: 'any_classroom_id',
    });

    expect(reminders).toEqual(
      expect.arrayContaining([reminder_01, reminder_02, reminder_03]),
    );
    expect(reminders).toHaveLength(3);
  });
});
