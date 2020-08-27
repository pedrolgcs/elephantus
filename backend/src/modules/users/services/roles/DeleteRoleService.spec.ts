import AppError from '@shared/errors/AppError';

// fakes
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';

// service
import DeleteRoleService from './DeleteRoleService';

let deleteRole: DeleteRoleService;
let fakeRolesRepository: FakeRolesRepository;

describe('DeleteRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    deleteRole = new DeleteRoleService(fakeRolesRepository);
  });

  it('should be able to delete a role', async () => {
    const role = await fakeRolesRepository.create({ name: 'admin' });

    await expect(
      deleteRole.execute({ role_id: role.id }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete a role on non existing id', async () => {
    await expect(
      deleteRole.execute({ role_id: 'non-existing-role-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
