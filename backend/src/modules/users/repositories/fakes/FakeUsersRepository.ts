import { v4 } from 'uuid';

// entities
import User from '@modules/users/infra/typeorm/entities/User';

// dtos
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFiltersUserDTO from '@modules/users/dtos/IFiltersUserDTO';

// repository
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: v4() }, userData);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.users.findIndex(user => user.id === id);
    this.users.splice(findIndex, 1);
  }

  public async find(name?: string): Promise<User[]> {
    const searchName = new RegExp(name, 'i');
    const findUsers = this.users.filter(user => searchName.test(user.name));

    return findUsers;
  }

  public async findById(id: string): Promise<User> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async findByNursery(
    nursery_id: string,
    except_user_id: string,
    _: IFiltersUserDTO,
  ): Promise<User[]> {
    const users = this.users.filter(user => {
      return user.nursery_id === nursery_id && user.id !== except_user_id;
    });

    return users;
  }
}

export default FakeUsersRepository;
