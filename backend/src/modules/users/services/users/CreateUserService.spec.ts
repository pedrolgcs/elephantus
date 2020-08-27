import AppError from '@shared/errors/AppError';

// fakes
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';
import FakeHashUser from '@modules/users/providers/HashUser/fakes/FakeHashUser';

// service
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeRolesRepository: FakeRolesRepository;
let fakeHashUser: FakeHashUser;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRolesRepository = new FakeRolesRepository();
    fakeHashUser = new FakeHashUser();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashUser);
  });

  it('should be able to create a new user', async () => {
    const role = await fakeRolesRepository.create({ name: 'admin' });

    const user = await createUser.execute({
      name: 'Peter',
      email: 'pedro@gmail.com',
      phone: '84996658042',
      password: '123123',
      role_id: role.id,
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Peter');
  });

  it('should not be able to create a new user with same email another', async () => {
    const role = await fakeRolesRepository.create({ name: 'admin' });

    await fakeUsersRepository.create({
      name: 'Peter',
      email: 'peter@gmail.com',
      password: '123123',
      role_id: role.id,
    });

    await expect(
      createUser.execute({
        name: 'Peter',
        email: 'peter@gmail.com',
        password: '123123',
        role_id: role.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
