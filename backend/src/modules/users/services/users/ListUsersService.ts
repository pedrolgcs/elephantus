import { injectable, inject } from 'tsyringe';

// entities
import User from '@modules/users/infra/typeorm/entities/User';

// repositories
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// dtos
import IFiltersUserDTO from '@modules/users/dtos/IFiltersUserDTO';

interface IRequest {
  nursery_id: string;
  filters: IFiltersUserDTO;
}

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ nursery_id, filters }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findByNursery(nursery_id, filters);
    return users;
  }
}

export default ListUsersService;
