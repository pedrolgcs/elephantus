import { injectable, inject } from 'tsyringe';

// entities
import Responsible from '@modules/responsible/infra/typeorm/entities/Responsible';

// interfaces
import IResponsibleRepository from '@modules/responsible/repositories/IResponsibleRepository';

@injectable()
class ListResponsibleService {
  constructor(
    @inject('ResponsibleRepository')
    private responsibleRepository: IResponsibleRepository,
  ) {}

  public async execute(): Promise<Responsible[]> {
    const responsible = await this.responsibleRepository.find();
    return responsible;
  }
}

export default ListResponsibleService;
