import Responsible from '../infra/typeorm/entities/Responsible';

// dtos
import ICreateResponsibleDTO from '../dtos/ICreateResponsibleDTO';

export default interface IResponsibleRepository {
  create(data: ICreateResponsibleDTO): Promise<Responsible>;
  save(responsible: Responsible): Promise<Responsible>;
  deleteById(id: string): Promise<void>;
  find(): Promise<Responsible[]>;
  findById(id: string): Promise<Responsible | undefined>;
  findByCPF(cpf: string): Promise<Responsible | undefined>;
}
