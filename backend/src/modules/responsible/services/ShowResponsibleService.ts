import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Responsible from 'modules/responsible/infra/typeorm/entities/Responsible';

// interfaces
import IResponsibleRepository from 'modules/responsible/repositories/IResponsibleRepository';

interface IRequest {
  responsible_id?: string;
  cpf?: string;
}

@injectable()
class ShowResponsibleService {
  constructor(
    @inject('ResponsibleRepository')
    private responsibleRepository: IResponsibleRepository,
  ) {}

  public async execute({
    responsible_id,
    cpf,
  }: IRequest): Promise<Responsible> {
    let responsible: Responsible;

    if (responsible_id) {
      responsible = await this.responsibleRepository.findById(responsible_id);
    } else {
      responsible = await this.responsibleRepository.findByCPF(cpf);
    }

    if (!responsible) {
      throw new AppError('Responsible not found', 400);
    }

    return responsible;
  }
}

export default ShowResponsibleService;
