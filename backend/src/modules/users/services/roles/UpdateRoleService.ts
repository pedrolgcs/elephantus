import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Role from '@modules/users/infra/typeorm/entities/Role';

// interfaces
import IRolesRepository from '@modules/users/repositories/IRolesRepository';

interface IRequest {
  role_id: string;
  name: string;
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ role_id, name }: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(role_id);

    if (!role) {
      throw new AppError('Role not found', 404);
    }

    role.name = name;

    await this.rolesRepository.save(role);

    return role;
  }
}

export default UpdateRoleService;
