import Nursery from '../infra/typeorm/entities/Nursery';

// dtos
import ICreateNurseryDTO from '../dtos/ICreateNurseryDTO';

export default interface INurseriesRepository {
  create(data: ICreateNurseryDTO): Promise<Nursery>;
  save(nursery: Nursery): Promise<Nursery>;
  deleteById(id: string): Promise<void>;
  find(): Promise<Nursery[]>;
  findById(id: string): Promise<Nursery | undefined>;
  findByCity(city: string): Promise<Nursery[]>;
}
