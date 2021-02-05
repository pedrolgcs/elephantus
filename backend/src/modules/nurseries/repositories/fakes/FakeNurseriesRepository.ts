import { v4 } from 'uuid';

// entities
import Nursery from '@modules/nurseries/infra/typeorm/entities/Nursery';

// dtos
import ICreateNurseryDTO from '@modules/nurseries/dtos/ICreateNurseryDTO';

// repository
import INurseriesRepository from '@modules/nurseries/repositories/INurseriesRepository';

class FakeNurseriesRepository implements INurseriesRepository {
  private nurseries: Nursery[] = [];

  public async create(data: ICreateNurseryDTO): Promise<Nursery> {
    const nursery = new Nursery();

    Object.assign(nursery, { id: v4() }, data);
    this.nurseries.push(nursery);
    return nursery;
  }

  public async save(nursery: Nursery): Promise<Nursery> {
    const findIndex = this.nurseries.findIndex(
      element => element.id === nursery.id,
    );
    this.nurseries[findIndex] = nursery;
    return nursery;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.nurseries.findIndex(element => element.id === id);
    this.nurseries.splice(findIndex, 1);
  }

  public async find(): Promise<Nursery[]> {
    return this.nurseries;
  }

  public async findByCity(city: string): Promise<Nursery[]> {
    const nursery = this.nurseries.filter(notice => notice.city === city);
    return nursery;
  }

  public async findById(id: string): Promise<Nursery | undefined> {
    const nursery = this.nurseries.find(element => element.id === id);
    return nursery;
  }
}

export default FakeNurseriesRepository;
