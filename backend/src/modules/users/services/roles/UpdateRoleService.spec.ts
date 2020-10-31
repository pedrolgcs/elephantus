import AppError from '@shared/errors/AppError';

// fakes
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';

// service
import UpdateRoleService from './UpdateRoleService';

let fakeRolesRepository: FakeRolesRepository;
let updateRole: UpdateRoleService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    updateRole = new UpdateRoleService(fakeRolesRepository);
  });

  it('should be able to update the role', async () => {
    const role = await fakeRolesRepository.create({
      name: 'Admin',
    });

    const updatedRole = await updateRole.execute({
      role_id: role.id,
      name: 'Teacher',
    });

    expect(updatedRole.name).toBe('Teacher');
  });

  it('should not be able to update the role if non-existing id', async () => {
    await expect(
      updateRole.execute({
        role_id: 'non-existing-role',
        name: 'Teacher',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
