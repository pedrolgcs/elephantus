import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Responsible from '@modules/responsible/infra/typeorm/entities/Responsible';

// interfaces
import IResponsibleRepository from '@modules/responsible/repositories/IResponsibleRepository';

interface IRequest {
  cpf: string;
  name: string;
  phone: string;
  city: string;
  neighborhood?: string;
  street?: string;
  number?: string;
}

@injectable()
class CreateResponsibleService {
  constructor(
    @inject('ResponsibleRepository')
    private responsibleRepository: IResponsibleRepository,
  ) {}

  public async execute(data: IRequest): Promise<Responsible> {
    const existingResponsibleWithCPF = await this.responsibleRepository.findByCPF(
      data.cpf,
    );

    if (existingResponsibleWithCPF) {
      throw new AppError('This CPF already used', 400);
    }

    const newResponsible = await this.responsibleRepository.create(data);
    return newResponsible;
  }
}

export default CreateResponsibleService;
