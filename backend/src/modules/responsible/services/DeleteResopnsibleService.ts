import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// interfaces
import IResponsibleRepository from 'modules/responsible/repositories/IResponsibleRepository';

interface IRequest {
  responsible_id: string;
}

@injectable()
class DeleteNoticeService {
  constructor(
    @inject('ResponsibleRepository')
    private responsibleRepository: IResponsibleRepository,
  ) {}

  public async execute({ responsible_id }: IRequest): Promise<void> {
    const responsible = await this.responsibleRepository.findById(
      responsible_id,
    );

    if (!responsible) {
      throw new AppError('Responsible not found', 400);
    }

    await this.responsibleRepository.deleteById(responsible_id);
  }
}

export default DeleteNoticeService;
