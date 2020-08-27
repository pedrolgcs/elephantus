import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Role from '@modules/users/infra/typeorm/entities/Role';

// interfaces
import IRolesRepository from '@modules/users/repositories/IRolesRepository';

interface IRequest {
  role_id: string;
}

@injectable()
class ShowRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ role_id }: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(role_id);

    if (!role) {
      throw new AppError('Role not found', 400);
    }

    return role;
  }
}

export default ShowRoleService;
