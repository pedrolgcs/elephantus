import { v4 } from 'uuid';

// entities
import Role from '@modules/users/infra/typeorm/entities/Role';

// dtos
import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';

// repository
import IRolesRepository from '../IRolesRepository';

class FakeRolesRepository implements IRolesRepository {
  private roles: Role[] = [];

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = new Role();
    Object.assign(role, { id: v4() }, roleData);
    this.roles.push(role);
    return role;
  }

  public async save(role: Role): Promise<Role> {
    const findIndex = this.roles.findIndex(findRole => findRole.id === role.id);
    this.roles[findIndex] = role;
    return role;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.roles.findIndex(role => role.id === id);
    this.roles.splice(findIndex, 1);
  }

  public async find(): Promise<Role[]> {
    return this.roles;
  }

  public async findById(id: string): Promise<Role | undefined> {
    const findRole = this.roles.find(role => role.id === id);
    return findRole;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const findRole = this.roles.find(role => role.name === name);
    return findRole;
  }
}

export default FakeRolesRepository;
