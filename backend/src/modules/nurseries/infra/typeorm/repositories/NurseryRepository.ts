import { Repository, getRepository } from 'typeorm';

// repository
import INurseriesRepository from '@modules/nurseries/repositories/INurseriesRepository';

// dtos
import ICreateNurseryDTO from '@modules/nurseries/dtos/ICreateNurseryDTO';

// entities
import Nursery from '@modules/nurseries/infra/typeorm/entities/Nursery';

class NurseryRepository implements INurseriesRepository {
  private ormRepository: Repository<Nursery>;

  constructor() {
    this.ormRepository = getRepository(Nursery);
  }

  public async create(data: ICreateNurseryDTO): Promise<Nursery> {
    const nursery = this.ormRepository.create(data);
    await this.ormRepository.save(nursery);
    return nursery;
  }

  public async save(nursery: Nursery): Promise<Nursery> {
    return this.ormRepository.save(nursery);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async find(): Promise<Nursery[]> {
    const nursery = await this.ormRepository.find({
      order: {
        name: 'DESC',
      },
    });
    return nursery;
  }

  public async findById(id: string): Promise<Nursery | undefined> {
    const nursery = await this.ormRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    return nursery;
  }

  public async findByCity(city: string): Promise<Nursery[]> {
    const nursery = await this.ormRepository.find({
      where: { city },
    });

    return nursery;
  }
}

export default NurseryRepository;
