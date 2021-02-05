import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import ListNurseriesByCityService from '@modules/nurseries/services/ListNurseriesByCityService';
import CreateNurseryService from '@modules/nurseries/services/CreateNurseryService';
import ShowNurseryService from '@modules/nurseries/services/ShowNurseryService';
import UpdateNurseryService from '@modules/nurseries/services/UpdateNurseryService';
import DeleteNurseryService from '@modules/nurseries/services/DeleteNurseryService';

class NurseriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { city } = request.query;

    const listNurseriesByCity = container.resolve(ListNurseriesByCityService);

    const nurseries = await listNurseriesByCity.execute({
      city: city.toString(),
    });

    return response.status(200).json(nurseries);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, city } = request.body;

    const createNursery = container.resolve(CreateNurseryService);

    const newNursery = await createNursery.execute({
      name,
      city,
    });

    return response.status(201).json(newNursery);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { nursery_id } = request.params;

    const showNursery = container.resolve(ShowNurseryService);

    const nursery = await showNursery.execute({ nursery_id });

    return response.status(200).json(nursery);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { nursery_id } = request.params;
    const { name, city } = request.body;

    const updateNursery = container.resolve(UpdateNurseryService);

    const updatedNotice = await updateNursery.execute({
      nursery_id,
      name,
      city,
    });

    return response.status(201).json(updatedNotice);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { nursery_id } = request.params;

    const deleteNursery = container.resolve(DeleteNurseryService);

    await deleteNursery.execute({ nursery_id });

    return response.status(204).send();
  }
}

export default NurseriesController;
