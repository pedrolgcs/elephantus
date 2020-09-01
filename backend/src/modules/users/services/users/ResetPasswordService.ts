import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// repositories
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// providers
import IHashUser from '@modules/users/providers/HashUser/models/IHashUser';

interface IRequest {
  user_id: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashUser')
    private hashUser: IHashUser,
  ) {}

  public async execute({ user_id, password }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    user.password = await this.hashUser.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
