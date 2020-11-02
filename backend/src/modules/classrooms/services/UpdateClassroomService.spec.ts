import AppError from '@shared/errors/AppError';

// fakes
import FakeClassroomsRepository from '@modules/classrooms/repositories/fakes/FakeClassroomsRepository';

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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another classroom name that is in use this shift', async () => {
    await fakeClassroomsRepository.create({
      name: 'sala 02',
      shift: 'morning',
    });

    const class01 = await fakeClassroomsRepository.create({
      name: 'sala 01',
      shift: 'morning',
      user_id: 'user_id',
    });

    await expect(
      updateClassroom.execute({
        classroom_id: class01.id,
        name: 'sala 02',
        shift: 'morning',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
