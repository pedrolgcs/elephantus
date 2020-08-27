import AppError from '@shared/errors/AppError';

// fakes
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';

// service
import CreateRoleService from './CreateRoleService';

let createRole: CreateRoleService;
let fakeRolesRepository: FakeRolesRepository;

describe('CreateRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    createRole = new CreateRoleService(fakeRolesRepository);
  });

  it('should be able to create a new role', async () => {
    const role = await createRole.execute({ name: 'Admin' });

    expect(role).toHaveProperty('id');
    expect(role.name).toBe('admin');
  });

  it('should not be able to create a new role with same name another', async () => {
    await createRole.execute({ name: 'Admin' });

    await expect(
      createRole.execute({
        name: 'Admin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
