import AppError from '@shared/errors/AppError';

// fakes
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRolersRepository from '@modules/users/repositories/fakes/FakeRolesRepository';

// service
import UpdateUsersService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeRolersRepository: FakeRolersRepository;
let updateUser: UpdateUsersService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRolersRepository = new FakeRolersRepository();
    updateUser = new UpdateUsersService(fakeUsersRepository);
  });

  it('should be able to update the profile', async () => {
    const admin = await fakeRolersRepository.create({ name: 'admin' });
    const teacher = await fakeRolersRepository.create({ name: 'teacher' });

    const user = await fakeUsersRepository.create({
      name: 'Peter',
      phone: '996658042',
      email: 'peter@gmail.com',
      password: '123123',
      role_id: admin.id,
    });

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'Spider',
      phone: '191',
      email: 'spider@gmail.com',
      role_id: teacher.id,
    });

    expect(updatedUser.name).toBe('Spider');
    expect(updatedUser.phone).toBe('191');
    expect(updatedUser.email).toBe('spider@gmail.com');
    expect(updatedUser.role_id).toBe(teacher.id);
  });

  it('should not be able to update the profile non-existing user', async () => {
    await expect(
      updateUser.execute({
        user_id: 'non-existing-user',
        name: 'Spider',
        phone: '191',
        email: 'spider@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email in use', async () => {
    await fakeUsersRepository.create({
      name: 'Spider',
      email: 'spider@gmail.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'peter@gmail.com',
      password: '123123',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'Spider',
        email: 'spider@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
