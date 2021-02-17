// import AppError from '@shared/errors/AppError';

// fakes
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';

// dtos
import IFiltersUserDTO from '@modules/users/dtos/IFiltersUserDTO';

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

  it('should be able to list a users based on nursery', async () => {
    const admin = await fakeRolesRepository.create({ name: 'admin' });
    const teacher = await fakeRolesRepository.create({ name: 'teacher' });

    const peter = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: '123123',
      role_id: admin.id,
      nursery_id: 'Acari',
    });

    const jana = await fakeUsersRepository.create({
      name: 'Jana',
      email: 'jana@gmail.com',
      password: '123123',
      role_id: teacher.id,
      nursery_id: 'Acari',
    });

    const joao = await fakeUsersRepository.create({
      name: 'Joao',
      email: 'joao@gmail.com',
      password: '123123',
      nursery_id: 'Acari',
    });

    const filters = {} as IFiltersUserDTO;

    const users = await listUsers.execute({
      nursery_id: 'Acari',
      except_user_id: peter.id,
      filters,
    });

    expect(users).toEqual(expect.arrayContaining([jana, joao]));
    expect(users).toHaveLength(2);
  });
});
