import { Repository, getRepository, Raw } from 'typeorm';

// repository
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// dtos
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

// entities
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository
      .createQueryBuilder()
      .update(User)
      .set({
        name: user.name,
        avatar: user.avatar,
        phone: user.phone,
        email: user.email,
        role_id: user.role_id,
        nursery_id: user.nursery_id,
      })
      .where('id = :id', { id: user.id })
      .execute();
    return this.ormRepository.findOne(user.id, {
      relations: ['classrooms', 'nursery'],
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async find(name: string): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        name: Raw(field => `${field} ILIKE '%${name}%'`),
      },
      relations: ['classrooms', 'nursery'],
      order: {
        name: 'ASC',
      },
    });
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
      relations: ['classrooms', 'nursery'],
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }
}

export default UsersRepository;
