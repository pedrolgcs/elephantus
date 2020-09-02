import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

// services
import CreateUserService from '@modules/users/services/users/CreateUserService';
import ListUsersService from '@modules/users/services/users/ListUsersService';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const listUser = container.resolve(ListUsersService);

    const users = await listUser.execute({ name: name.toString() });

    return response.status(200).json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, phone, email, password, role_id } = request.body;

    const creatUser = container.resolve(CreateUserService);

    const user = await creatUser.execute({
      name,
      phone,
      email,
      password,
      role_id,
    });

    return response.status(201).json(classToClass(user));
  }
}

export default UsersController;
