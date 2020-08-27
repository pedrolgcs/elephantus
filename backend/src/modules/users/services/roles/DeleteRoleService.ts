import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// interfaces
import IRolesRepository from '@modules/users/repositories/IRolesRepository';

interface IRequest {
  role_id: string;
}

@injectable()
class DeleteRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ role_id }: IRequest): Promise<void> {
    const role = await this.rolesRepository.findById(role_id);

    if (!role) {
      throw new AppError('Role not found', 400);
    }

    await this.rolesRepository.deleteById(role_id);
  }
}

export default DeleteRoleService;
