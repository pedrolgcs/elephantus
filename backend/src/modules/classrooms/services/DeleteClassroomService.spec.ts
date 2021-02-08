import { v4 as uuidv4 } from 'uuid';

import AppError from '@shared/errors/AppError';

// fakes
import FakeClassroomsRepository from '@modules/classrooms/repositories/fakes/FakeClassroomsRepository';

// helpers
import ClassroomBuilder from '@modules/classrooms/helpers/ClassroomBuilder';

// service
import DeleteClassroomService from './DeleteClassroomService';

let deleteCLassroom: DeleteClassroomService;
let fakeClassroomsRepository: FakeClassroomsRepository;

describe('DeleteClassroom', () => {
  beforeEach(() => {
    fakeClassroomsRepository = new FakeClassroomsRepository();
    deleteCLassroom = new DeleteClassroomService(fakeClassroomsRepository);
  });

  it('should be able to delete a classroom', async () => {
    const classroom = await fakeClassroomsRepository.create({
      name: 'Sala 01',
      shift: 'morning',
      user_id: 'user_id',
    });

    await expect(
      deleteCLassroom.execute({
        classroom_id: classroom.id,
        user_id: 'user_id',
      }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete a classroom on non existing id', async () => {
    await expect(
      deleteCLassroom.execute({
        classroom_id: 'non-existing-classroom-id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete the classroom that belongs to another user', async () => {
    const classroom_another_user = await fakeClassroomsRepository.create(
      new ClassroomBuilder(uuidv4()).setUser('another_id').build(),
    );

    await expect(
      deleteCLassroom.execute({
        classroom_id: classroom_another_user.id,
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
