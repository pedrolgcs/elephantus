// fakes
import FakeRolesRepository from '@modules/users/repositories/fakes/FakeRolesRepository';

// service
import ShowAllRolesService from './ShowAllRolesService';

let showAllRole: ShowAllRolesService;
let fakeRolesRepository: FakeRolesRepository;

describe('ShowAllRoles', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    showAllRole = new ShowAllRolesService(fakeRolesRepository);
  });

  it('should be able to show the all roles', async () => {
    const admin = await fakeRolesRepository.create({ name: 'admin' });
    const teacher = await fakeRolesRepository.create({ name: 'teacher' });

    const roles = await showAllRole.execute();

    expect(roles).toEqual(expect.arrayContaining([admin, teacher]));
    expect(roles).toHaveLength(2);
  });
});
