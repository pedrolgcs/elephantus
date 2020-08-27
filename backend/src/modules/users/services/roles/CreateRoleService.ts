import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Role from '@modules/users/infra/typeorm/entities/Role';

// interfaces
import IRolesRepository from '@modules/users/repositories/IRolesRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Role> {
    const parsedName = name.toLocaleLowerCase();

    const existsRole = await this.rolesRepository.findByName(parsedName);

    if (existsRole) {
      throw new AppError('This role already exists', 400);
    }

    const role = await this.rolesRepository.create({
      name: parsedName,
    });

    return role;
  }
}

export default CreateRoleService;
