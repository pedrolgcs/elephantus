import { injectable, inject } from 'tsyringe';

// entities
import Nursery from '@modules/nurseries/infra/typeorm/entities/Nursery';

// interfaces
import INurseriesRepository from '@modules/nurseries/repositories/INurseriesRepository';

interface IRequest {
  name: string;
  city: string;
}

@injectable()
class CreateNurseryService {
  constructor(
    @inject('NurseryRepository')
    private nurseryRepository: INurseriesRepository,
  ) {}

  public async execute({ name, city }: IRequest): Promise<Nursery> {
    const nursery = await this.nurseryRepository.create({
      name,
      city,
    });

    return nursery;
  }
}

export default CreateNurseryService;
