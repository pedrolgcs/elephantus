import { Repository, getRepository } from 'typeorm';

// repository
import IRolesRepository from '@modules/users/repositories/IRolesRepository';

// dtos
import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';

// entities
import Role from '../entities/Role';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create(roleData);
    await this.ormRepository.save(role);
    return role;
  }

  public async save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async find(): Promise<Role[]> {
    const roles = await this.ormRepository.find({
      order: { name: 'ASC' },
    });
    return roles;
  }

  public async findById(id: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne(id);
    return role;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: { name },
    });
    return role;
  }
}

export default RolesRepository;
