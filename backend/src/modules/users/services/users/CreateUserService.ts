import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import User from '@modules/users/infra/typeorm/entities/User';

// repositories
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INurseriesRepository from '@modules/nurseries/repositories/INurseriesRepository';

// providers
import IHashUser from '@modules/users/providers/HashUser/models/IHashUser';

interface IRequest {
  name: string;
  phone?: string;
  email: string;
  password: string;
  role_id?: string;
  nursery_id?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashUser')
    private hashUser: IHashUser,
  ) {}

  public async execute({
    name,
    phone,
    email,
    password,
    role_id,
    nursery_id,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashUser.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role_id,
      nursery_id,
    });

    return user;
  }
}

export default CreateUserService;
