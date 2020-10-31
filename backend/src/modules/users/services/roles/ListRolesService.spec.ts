// fakes
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';

// service
import ListRolesService from './ListRolesService';

let listRoles: ListRolesService;
let fakeRolesRepository: FakeRolesRepository;

describe('ShowAllRoles', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    listRoles = new ListRolesService(fakeRolesRepository);
  });

  it('should be able to show the all roles', async () => {
    const admin = await fakeRolesRepository.create({ name: 'admin' });
    const teacher = await fakeRolesRepository.create({ name: 'teacher' });

    const roles = await listRoles.execute();

    expect(roles).toEqual(expect.arrayContaining([admin, teacher]));
    expect(roles).toHaveLength(2);
  });
});
