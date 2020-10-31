import { Request, Response } from 'express';
import { container } from 'tsyringe';

// service
import ListRolesService from '@modules/users/services/roles/ListRolesService';
import CreateRoleService from '@modules/users/services/roles/CreateRoleService';
import ShowRoleService from '@modules/users/services/roles/ShowRoleService';
import DeleteRoleService from '@modules/users/services/roles/DeleteRoleService';

class RolesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showAllRoles = container.resolve(ListRolesService);

    const roles = await showAllRoles.execute();

    return response.status(200).json(roles);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createRole = container.resolve(CreateRoleService);

    const role = await createRole.execute({ name });

    return response.status(201).json(role);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { role_id } = request.params;

    const showRole = container.resolve(ShowRoleService);

    const role = await showRole.execute({ role_id });

    return response.status(200).json(role);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { role_id } = request.params;

    const deleteRole = container.resolve(DeleteRoleService);

    await deleteRole.execute({ role_id });

    return response.status(204).send();
  }
}

export default RolesController;
