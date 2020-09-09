import Role from '../infra/typeorm/entities/Role';

// dtos
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';

export default interface IRolesRepository {
  create(data: ICreateRoleDTO): Promise<Role>;
  save(role: Role): Promise<Role>;
  deleteById(id: string): Promise<void>;
  find(): Promise<Role[]>;
  findByName(name: string): Promise<Role | undefined>;
  findById(id: string): Promise<Role | undefined>;
}
