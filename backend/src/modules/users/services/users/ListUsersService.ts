import { injectable, inject } from 'tsyringe';

// entities
import User from '@modules/users/infra/typeorm/entities/User';

// repositories
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
}

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findUsers(name);
    return users;
  }
}

export default ListUsersService;
