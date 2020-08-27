import { injectable, inject } from 'tsyringe';

// entities
import Role from '@modules/users/infra/typeorm/entities/Role';

// interfaces
import IRolesRepository from '@modules/users/repositories/IRolesRepository';

@injectable()
class ShowAllRolesService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(): Promise<Role[]> {
    const roles = await this.rolesRepository.findAllRoles();
    return roles;
  }
}

export default ShowAllRolesService;
