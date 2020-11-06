import AppError from '@shared/errors/AppError';

// fakes
import FakeClassroomsRepository from '@modules/classrooms/repositories/fakes/FakeClassroomsRepository';

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
      deleteCLassroom.execute({ classroom_id: classroom.id }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete a classroom on non existing id', async () => {
    await expect(
      deleteCLassroom.execute({ classroom_id: 'non-existing-classroom-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
