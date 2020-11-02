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

  it('should be able to list a classrooms based on name', async () => {
    const sala01 = await fakeClassroomsRepository.create({
      name: 'Sala 01',
      shift: 'morning',
      user_id: 'user-id',
    });

    await fakeClassroomsRepository.create({
      name: 'Sala 02',
      shift: 'morning',
      user_id: 'user-id',
    });

    await fakeClassroomsRepository.create({
      name: 'Sala 03',
      shift: 'morning',
      user_id: 'user-id',
    });

    const classrooms = await listClassrooms.execute({ name: 'Sala 01' });
    expect(classrooms).toEqual(expect.arrayContaining([sala01]));
    expect(classrooms).toHaveLength(1);
  });
});
