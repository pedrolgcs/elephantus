import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import ListResponsibleService from '@modules/responsible/services/ListResponsibleService';
import CreateResponsibleService from '@modules/responsible/services/CreateResponsibleService';
import ShowResponsibleService from '@modules/responsible/services/ShowResponsibleService';
import UpdateResponsibleService from '@modules/responsible/services/UpdateResponsibleService';
import DeleteResopnsibleService from '@modules/responsible/services/DeleteResopnsibleService';

class ResponsibleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listResponsible = container.resolve(ListResponsibleService);

    const responsible = await listResponsible.execute();

    return response.status(200).json(responsible);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      cpf,
      name,
      phone,
      city,
      neighborhood,
      street,
      number,
    } = request.body;

    const createResponsible = container.resolve(CreateResponsibleService);

    const newResponsible = await createResponsible.execute({
      cpf,
      name,
      phone,
      city,
      neighborhood,
      street,
      number,
    });

    return response.status(201).json(newResponsible);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { responsible_id } = request.params;

    const showResponsible = container.resolve(ShowResponsibleService);

    const responsible = await showResponsible.execute({ responsible_id });

    return response.status(200).json(responsible);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { responsible_id } = request.params;
    const {
      cpf,
      name,
      phone,
      city,
      neighborhood,
      street,
      number,
    } = request.body;

    const updateResponsible = container.resolve(UpdateResponsibleService);

    const updatedReminder = await updateResponsible.execute({
      responsible_id,
      cpf,
      name,
      phone,
      city,
      neighborhood,
      street,
      number,
    });

    return response.status(201).json(updatedReminder);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { responsible_id } = request.params;

    const deleteResponsible = container.resolve(DeleteResopnsibleService);

    await deleteResponsible.execute({ responsible_id });

    return response.status(204).send();
  }
}

export default ResponsibleController;
