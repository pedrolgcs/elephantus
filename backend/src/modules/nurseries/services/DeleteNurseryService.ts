import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// interfaces
import INurseriesRepository from '@modules/nurseries/repositories/INurseriesRepository';

interface IRequest {
  nursery_id: string;
}

@injectable()
class DeleteNurseryService {
  constructor(
    @inject('NurseryRepository')
    private nurseryRepository: INurseriesRepository,
  ) {}

  public async execute({ nursery_id }: IRequest): Promise<void> {
    const nursery = await this.nurseryRepository.findById(nursery_id);

    if (!nursery) {
      throw new AppError('Nursery not found', 400);
    }

    await this.nurseryRepository.deleteById(nursery_id);
  }
}

export default DeleteNurseryService;
