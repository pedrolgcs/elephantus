import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import ShowResponsibleService from '@modules/responsible/services/ShowResponsibleService';

class ResponsibleAuthenticatedController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const showResponsible = container.resolve(ShowResponsibleService);

    const responsible = await showResponsible.execute({ cpf });

    return response.status(200).json(responsible);
  }
}

export default ResponsibleAuthenticatedController;
