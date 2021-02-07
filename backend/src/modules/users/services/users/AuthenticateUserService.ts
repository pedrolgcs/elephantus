import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// config
import authConfig from '@config/auth';

// entities
import User from '@modules/users/infra/typeorm/entities/User';

// Interfaces
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashUsers from '@modules/users/providers/HashUser/models/IHashUser';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashUser')
    private hashUser: IHashUsers,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashUser.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    // isRole? by default is Auth
    const role = user.role ? user.role.name : 'auth';

    const token = sign({ role, nursery: user.nursery_id }, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
