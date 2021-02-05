import { injectable, inject } from 'tsyringe';

// entities
import Nursery from '@modules/nurseries/infra/typeorm/entities/Nursery';

// interfaces
import INurseriesRepository from '@modules/nurseries/repositories/INurseriesRepository';

interface IRequest {
  city: string;
}

@injectable()
class ListNurseriesByCityService {
  constructor(
    @inject('NurseryRepository')
    private nurseryRepository: INurseriesRepository,
  ) {}

  public async execute({ city }: IRequest): Promise<Nursery[]> {
    const nurseries = await this.nurseryRepository.findByCity(city);
    return nurseries;
  }
}

export default ListNurseriesByCityService;
