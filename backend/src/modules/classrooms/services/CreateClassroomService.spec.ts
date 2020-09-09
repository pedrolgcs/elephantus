import AppError from '@shared/errors/AppError';

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

  it('should be able to create a new classroom with the same name but on different shifts', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'peter@gmail.com',
      password: '123123',
    });

    await createClassroom.execute({
      name: 'Sala 01',
      shift: 'morning',
      user_id: user.id,
    });

    await createClassroom.execute({
      name: 'Sala 01',
      shift: 'afternoon',
      user_id: user.id,
    });

    const classroom = await createClassroom.execute({
      name: 'Sala 01',
      shift: 'night',
      user_id: user.id,
    });

    expect(classroom).toHaveProperty('id');
    expect(classroom.name).toBe('Sala 01');
  });

  it('should not be able to create a new classroom with same name another', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'peter@gmail.com',
      password: '123123',
    });

    await createClassroom.execute({
      name: 'Sala 01',
      shift: 'morning',
      user_id: user.id,
    });

    await expect(
      createClassroom.execute({
        name: 'Sala 01',
        shift: 'morning',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
