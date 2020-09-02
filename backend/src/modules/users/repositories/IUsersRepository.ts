import User from '../infra/typeorm/entities/User';

// dtos
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findUsers(name: string): Promise<User[]>;
}
