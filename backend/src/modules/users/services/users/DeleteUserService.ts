import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// repositories
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user does not exists', 400);
    }

    await this.usersRepository.deleteById(user_id);
  }
}

export default DeleteUserService;
