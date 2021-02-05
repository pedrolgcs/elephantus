import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Nursery from '@modules/nurseries/infra/typeorm/entities/Nursery';

// interfaces
import INurseriesRepository from '@modules/nurseries/repositories/INurseriesRepository';

interface IRequest {
  nursery_id;
  name: string;
  city: string;
}

@injectable()
class UpdateNurseryService {
  constructor(
    @inject('NurseryRepository')
    private nurseryRepository: INurseriesRepository,
  ) {}

  public async execute({ nursery_id, name, city }: IRequest): Promise<Nursery> {
    const nursery = await this.nurseryRepository.findById(nursery_id);

    if (!nursery) {
      throw new AppError('Nursery not found', 404);
    }

    Object.assign(nursery, { name, city });

    await this.nurseryRepository.save(nursery);

    return nursery;
  }
}

export default UpdateNurseryService;
