import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import User from '@modules/users/infra/typeorm/entities/User';

// interfaces
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  phone?: string;
  email: string;
  role_id?: string;
  nursery_id?: string;
}

@injectable()
class UpdateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    phone,
    email,
    role_id,
    nursery_id,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user does not exists', 400);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use');
    }

    const updatedUser = Object.assign(user, {
      name,
      phone,
      email,
      role_id,
      nursery_id,
    });

    return this.usersRepository.save(updatedUser);
  }
}

export default UpdateUsersService;
