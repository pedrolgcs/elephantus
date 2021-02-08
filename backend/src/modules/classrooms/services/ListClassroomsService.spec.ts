// import AppError from '@shared/errors/AppError';

// fakes
import FakeClassroomsRepository from '@modules/classrooms/repositories/fakes/FakeClassroomsRepository';

// service
import ListClassroomsService from './ListClassroomsService';

let fakeClassroomsRepository: FakeClassroomsRepository;
let listClassrooms: ListClassroomsService;

describe('ListClassrooms', () => {
  beforeEach(() => {
    fakeClassroomsRepository = new FakeClassroomsRepository();
    listClassrooms = new ListClassroomsService(fakeClassroomsRepository);
  });

  it('should be able to list a classrooms based on user', async () => {
    const sala01 = await fakeClassroomsRepository.create({
      name: 'Sala 01',
      shift: 'morning',
      user_id: 'user-id',
    });

    const sala02 = await fakeClassroomsRepository.create({
      name: 'Sala 02',
      shift: 'morning',
      user_id: 'user-id',
    });

    await fakeClassroomsRepository.create({
      name: 'Sala 03',
      shift: 'morning',
      user_id: 'another_user',
    });

    const classrooms = await listClassrooms.execute({
      user_id: 'user-id',
      filters: {},
    });
    expect(classrooms).toEqual(expect.arrayContaining([sala01, sala02]));
    expect(classrooms).toHaveLength(2);
  });
});
