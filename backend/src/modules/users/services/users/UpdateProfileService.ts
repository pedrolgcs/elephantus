import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import User from '@modules/users/infra/typeorm/entities/User';

// repositories
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashUser from '@modules/users/providers/HashUser/models/IHashUser';

interface IRequest {
  user_id: string;
  phone?: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashUser')
    private hashUser: IHashUser,
  ) {}

  public async execute({
    user_id,
    name,
    phone,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user does not exists', 400);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use');
    }

    Object.assign(user, { name, email, phone });

    /*
      user.name = name;
      user.email = email;
      user.phone = phone;
    */

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashUser.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      // update password
      user.password = await this.hashUser.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
