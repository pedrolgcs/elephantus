import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Nursery from '@modules/nurseries/infra/typeorm/entities/Nursery';

// interfaces
import INurseriesRepository from '@modules/nurseries/repositories/INurseriesRepository';

interface IRequest {
  nursery_id: string;
}

@injectable()
class ShowNurseryService {
  constructor(
    @inject('NurseryRepository')
    private nurseryRepository: INurseriesRepository,
  ) {}

  public async execute({ nursery_id }: IRequest): Promise<Nursery> {
    const nursery = await this.nurseryRepository.findById(nursery_id);

    if (!nursery) {
      throw new AppError('Nursery not found', 400);
    }

    return nursery;
  }
}

export default ShowNurseryService;
