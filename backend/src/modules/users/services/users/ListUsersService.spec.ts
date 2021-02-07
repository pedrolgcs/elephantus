// import AppError from '@shared/errors/AppError';

// fakes
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';

// service
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeRolesRepository: FakeRolesRepository;
let listUsers: ListUsersService;

describe('List Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRolesRepository = new FakeRolesRepository();
    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list a users based on name', async () => {
    const admin = await fakeRolesRepository.create({ name: 'admin' });
    const teacher = await fakeRolesRepository.create({ name: 'teacher' });

    await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: '123123',
      role_id: admin.id,
    });

    const jana = await fakeUsersRepository.create({
      name: 'Jana',
      email: 'jana@gmail.com',
      password: '123123',
      role_id: teacher.id,
    });

    await fakeUsersRepository.create({
      name: 'Joao',
      email: 'joao@gmail.com',
      password: '123123',
    });

    const users = await listUsers.execute({ name: 'Jana' });
    expect(users).toEqual(expect.arrayContaining([jana]));
    expect(users).toHaveLength(1);
  });
});
