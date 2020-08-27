import AppError from '@shared/errors/AppError';

// fakes
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

// service
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show a user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter',
      email: 'pedro@gmail.com',
      phone: '84996658042',
      password: '123123',
    });

    const peter = await showProfile.execute({ user_id: user.id });

    expect(peter.name).toBe('Peter');
  });

  it('should not be able to show a user profile with non existing id', async () => {
    await fakeUsersRepository.create({
      name: 'Peter',
      email: 'peter@gmail.com',
      password: '123123',
    });

    await expect(
      showProfile.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
