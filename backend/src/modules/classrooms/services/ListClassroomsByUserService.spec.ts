// import AppError from '@shared/errors/AppError';

// fakes
import FakeClassroomsRepository from '@modules/classrooms/repositories/fakes/FakeClassroomsRepository';

// service
import ListClassroomsByUserService from './ListClassroomsByUserService';

let fakeClassroomsRepository: FakeClassroomsRepository;
let listClassroomsByUser: ListClassroomsByUserService;

describe('ListClassroomsByUser', () => {
  beforeEach(() => {
    fakeClassroomsRepository = new FakeClassroomsRepository();
    listClassroomsByUser = new ListClassroomsByUserService(
      fakeClassroomsRepository,
    );
  });

  it('should be able to list a classrooms based on user', async () => {
    const sala_01 = await fakeClassroomsRepository.create({
      name: 'Sala 01',
      shift: 'morning',
      user_id: 'user_id',
    });

    const sala_02 = await fakeClassroomsRepository.create({
      name: 'Sala 02',
      shift: 'morning',
      user_id: 'user_id',
    });

    await fakeClassroomsRepository.create({
      name: 'Sala 03',
      shift: 'morning',
      user_id: 'other_id',
    });

    const classrooms = await listClassroomsByUser.execute({
      user_id: 'user_id',
    });
    expect(classrooms).toEqual(expect.arrayContaining([sala_01, sala_02]));
    expect(classrooms).toHaveLength(2);
  });
});
