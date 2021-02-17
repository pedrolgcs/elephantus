import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

// services
import CreateUserService from '@modules/users/services/users/CreateUserService';
import ShowProfileService from '@modules/users/services/users/ShowProfileService';
import ListUsersService from '@modules/users/services/users/ListUsersService';
import UpdateUserService from '@modules/users/services/users/UpdateUserService';
import DeleteUserService from '@modules/users/services/users/DeleteUserService';

// dtos
import IFiltersUserDTO from '@modules/users/dtos/IFiltersUserDTO';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const { nursery: nursery_id, id: user_id } = request.user;

    const filters = {
      name,
    } as IFiltersUserDTO;

    const listUser = container.resolve(ListUsersService);

    const users = await listUser.execute({
      nursery_id,
      except_user_id: user_id,
      filters,
    });

    return response.status(200).json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.status(200).json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, phone, email, password, role_id, nursery_id } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      phone,
      email,
      password,
      role_id,
      nursery_id,
    });

    return response.status(201).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { name, phone, email, role_id, nursery_id } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user_id,
      name,
      phone,
      email,
      role_id,
      nursery_id,
    });

    return response.status(201).json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ user_id });

    return response.status(204).send();
  }
}

export default UsersController;
