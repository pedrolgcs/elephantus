import AppError from '@shared/errors/AppError';

// fakes
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashUser from '@modules/users/providers/HashUser/fakes/FakeHashUser';

// service
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashUser: FakeHashUser;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashUser = new FakeHashUser();
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashUser);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      phone: '996658042',
      email: 'peter@gmail.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Spider',
      phone: '191',
      email: 'spider@gmail.com',
    });

    expect(updatedUser.name).toBe('Spider');
    expect(updatedUser.phone).toBe('191');
    expect(updatedUser.email).toBe('spider@gmail.com');
  });

  it('should not be able to update the profile non-existing user', async () => {
    await expect(
      updateProfile.execute({
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
      updateProfile.execute({
        user_id: user.id,
        name: 'Spider',
        email: 'spider@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Spider',
      email: 'spider@gmail.com',
      old_password: '123123',
      password: 'new-password',
    });

    expect(updatedUser.password).toBe('new-password');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Spider',
        email: 'spider@gmail.com',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      password: 'password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Spider',
        email: 'spider@gmail.com',
        old_password: 'wrong-password',
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
