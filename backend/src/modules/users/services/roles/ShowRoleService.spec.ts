import AppError from '@shared/errors/AppError';

// fakes
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';

// service
import ShowRoleService from './ShowRoleService';

let showRole: ShowRoleService;
let fakeRolesRepository: FakeRolesRepository;

describe('ShowRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    showRole = new ShowRoleService(fakeRolesRepository);
  });

  it('should be able to show the role', async () => {
    const admin = await fakeRolesRepository.create({ name: 'admin' });
    const role = await showRole.execute({ role_id: admin.id });
    expect(role.name).toBe('admin');
  });

  it('should not be able to show the role on non existing id', async () => {
    await expect(
      showRole.execute({ role_id: 'non-existing-role-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
