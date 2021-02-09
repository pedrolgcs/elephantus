import User from '../infra/typeorm/entities/User';

// dtos
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFiltersUserDTO from '../dtos/IFiltersUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  deleteById(id: string): Promise<void>;
  find(name?: string): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByNursery(nursery_id: string, filters: IFiltersUserDTO): Promise<User[]>;
}
