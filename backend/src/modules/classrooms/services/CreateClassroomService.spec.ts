// fakes
import FakeClassroomsRepository from '@modules/classrooms/repositories/fakes/FakeClassroomsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

// service
import CreateClassroomService from './CreateClassroomService';

let fakeClassroomsRepository: FakeClassroomsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createClassroom: CreateClassroomService;

describe('CreateClassroom', () => {
  beforeEach(() => {
    fakeClassroomsRepository = new FakeClassroomsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createClassroom = new CreateClassroomService(fakeClassroomsRepository);
  });

  it('should be able to create a new classroom', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'peter@gmail.com',
      password: '123123',
    });

    const classroom = await createClassroom.execute({
      name: 'Sala 01',
      shift: 'morning',
      user_id: user.id,
    });

    expect(classroom).toHaveProperty('id');
    expect(classroom.name).toBe('Sala 01');
  });
});
