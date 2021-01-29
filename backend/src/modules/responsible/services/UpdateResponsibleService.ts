import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Responsible from 'modules/responsible/infra/typeorm/entities/Responsible';

// interfaces
import IResponsibleRepository from 'modules/responsible/repositories/IResponsibleRepository';

interface IRequest {
  responsible_id: string;
  cpf: string;
  name: string;
  phone: string;
  city: string;
  neighborhood?: string;
  street?: string;
  number?: string;
}

@injectable()
class UpdateNoticeService {
  constructor(
    @inject('ResponsibleRepository')
    private responsibleRepository: IResponsibleRepository,
  ) {}

  public async execute({
    responsible_id,
    cpf,
    name,
    phone,
    city,
    neighborhood,
    street,
    number,
  }: IRequest): Promise<Responsible> {
    const existingResponsible = await this.responsibleRepository.findById(
      responsible_id,
    );

    if (!existingResponsible) {
      throw new AppError('Responsible not found', 400);
    }

    const responsibleWithSameCPF = await this.responsibleRepository.findByCPF(
      cpf,
    );

    if (
      responsibleWithSameCPF &&
      responsibleWithSameCPF.id !== responsible_id
    ) {
      throw new AppError('CPF already in use');
    }

    const updatedResponsible = Object.assign(existingResponsible, {
      cpf,
      name,
      phone,
      city,
      neighborhood,
      street,
      number,
    });

    await this.responsibleRepository.save(updatedResponsible);

    return updatedResponsible;
  }
}

export default UpdateNoticeService;
