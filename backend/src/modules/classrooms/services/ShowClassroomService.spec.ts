import AppError from '@shared/errors/AppError';

// fakes
import FakeClassroomsRepository from '@modules/classrooms/repositories/fakes/FakeClassroomsRepository';

// service
import ShowClassroomService from './ShowClassroomService';

let fakeClassroomsRepository: FakeClassroomsRepository;
let showClassroom: ShowClassroomService;

describe('ShowClassroomService', () => {
  beforeEach(() => {
    fakeClassroomsRepository = new FakeClassroomsRepository();
    showClassroom = new ShowClassroomService(fakeClassroomsRepository);
  });

  it('should be able to show a classroom', async () => {
    const classroom = await fakeClassroomsRepository.create({
      name: 'Sala 01',
      shift: 'morning',
      user_id: 'user_id',
    });

    const class01 = await showClassroom.execute({ classroom_id: classroom.id });

    expect(class01.name).toBe('Sala 01');
  });

  it('should not be able to show a user profile with non existing id', async () => {
    await expect(
      showClassroom.execute({
        classroom_id: 'non-existing-classroom',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
