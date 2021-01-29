import { v4 } from 'uuid';

// entities
import Responsible from '@modules/responsible/infra/typeorm/entities/Responsible';

// dtos
import ICreateResponsibleDTO from '@modules/responsible/dtos/ICreateResponsibleDTO';

// repository
import IResponsibleRepository from '@modules/responsible/repositories/IResponsibleRepository';

class FakeResponsibleRepository implements IResponsibleRepository {
  private responsible: Responsible[] = [];

  public async create(data: ICreateResponsibleDTO): Promise<Responsible> {
    const responsible = new Responsible();
    Object.assign(responsible, { id: v4() }, data);
    this.responsible.push(responsible);
    return responsible;
  }

  public async save(responsible: Responsible): Promise<Responsible> {
    const findIndex = this.responsible.findIndex(
      element => element.id === responsible.id,
    );
    this.responsible[findIndex] = responsible;
    return responsible;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.responsible.findIndex(element => element.id === id);
    this.responsible.splice(findIndex, 1);
  }

  public async find(): Promise<Responsible[]> {
    return this.responsible;
  }

  public async findById(id: string): Promise<Responsible | undefined> {
    const responsible = this.responsible.find(element => element.id === id);
    return responsible;
  }

  public async findByCPF(cpf: string): Promise<Responsible | undefined> {
    const responsible = this.responsible.find(element => element.cpf === cpf);
    return responsible;
  }
}

export default FakeResponsibleRepository;
