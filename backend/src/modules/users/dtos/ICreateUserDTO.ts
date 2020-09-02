// entities
import Role from '@modules/users/infra/typeorm/entities/Role';

export default interface ICreateUserDTO {
  name: string;
  phone?: string;
  email: string;
  password: string;
  role_id?: string;
  role?: Role;
}
