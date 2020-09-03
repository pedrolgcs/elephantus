import AppError from '@shared/errors/AppError';

// fakes
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

// service
import DeleteUserService from './DeleteUserService';

let deleteUser: DeleteUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUser = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able to delete a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'peter@gmail.com',
      password: '123123',
      phone: '996658042',
    });

    await expect(
      deleteUser.execute({ user_id: user.id }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete a user on non existing id', async () => {
    await expect(
      deleteUser.execute({ user_id: 'non-existing-role-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
