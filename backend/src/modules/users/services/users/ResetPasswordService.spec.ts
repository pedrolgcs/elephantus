import AppError from '@shared/errors/AppError';

// fakes
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashUser from '@modules/users/providers/HashUser/fakes/FakeHashUser';

// service
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashUser: FakeHashUser;
let resetPassword: ResetPasswordService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashUser = new FakeHashUser();
    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeHashUser);
  });

  it('should be able to reset user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'peter@gmail.com',
      password: '123123',
    });

    await resetPassword.execute({
      user_id: user.id,
      password: '321321',
    });

    expect(user.password).toBe('321321');
  });

  it('should not be able to reset password a non existing user', async () => {
    await expect(
      resetPassword.execute({
        user_id: 'non-existing-user',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
