import { v4 as uuidv4 } from 'uuid';

import AppError from '@shared/errors/AppError';

// fakes
import FakeClassroomsRepository from '@modules/classrooms/repositories/fakes/FakeClassroomsRepository';

// helpers
import ClassroomBuilder from '@modules/classrooms/helpers/ClassroomBuilder';

// service
import UpdateClassroomService from './UpdateClassroomService';

let fakeClassroomsRepository: FakeClassroomsRepository;
let updateClassroom: UpdateClassroomService;

describe('UpdateClassroom', () => {
  beforeEach(() => {
    fakeClassroomsRepository = new FakeClassroomsRepository();
    updateClassroom = new UpdateClassroomService(fakeClassroomsRepository);
  });

  it('should be able to update the classroom', async () => {
    const class01 = await fakeClassroomsRepository.create({
      name: 'sala 01',
      shift: 'morning',
      user_id: 'user_id',
    });

    const updatedClassroom = await updateClassroom.execute({
      classroom_id: class01.id,
      name: 'sala 02',
      shift: 'morning',
      user_id: 'user_id',
    });

    expect(updatedClassroom.name).toBe('sala 02');
    expect(updatedClassroom.user_id).toBe('user_id');
  });

  it('should not be able to update the classroom if non-existing id', async () => {
    await expect(
      updateClassroom.execute({
        classroom_id: 'non-existing-classroom',
        name: 'sala 01',
        shift: 'morning',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the classroom that belongs to another user', async () => {
    const classroom_another_user = await fakeClassroomsRepository.create(
      new ClassroomBuilder(uuidv4()).setUser('another_id').build(),
    );

    await expect(
      updateClassroom.execute({
        classroom_id: classroom_another_user.id,
        name: 'sala 01',
        shift: 'morning',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
