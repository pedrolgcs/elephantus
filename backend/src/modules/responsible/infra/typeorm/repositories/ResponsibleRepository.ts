import { Repository, getRepository } from 'typeorm';

// repository
import IResponsibleRepository from '@modules/responsible/repositories/IResponsibleRepository';

// dtos
import ICreateResponsibleDTO from '@modules/responsible/dtos/ICreateResponsibleDTO';

// entities
import Responsible from '@modules/responsible/infra/typeorm/entities/Responsible';

class ResponsibleRepository implements IResponsibleRepository {
  private ormRepository: Repository<Responsible>;

  constructor() {
    this.ormRepository = getRepository(Responsible);
  }

  public async create(data: ICreateResponsibleDTO): Promise<Responsible> {
    const responsible = this.ormRepository.create(data);
    await this.ormRepository.save(responsible);
    return responsible;
  }

  public async save(responsible: Responsible): Promise<Responsible> {
    await this.ormRepository.save(responsible);
    return responsible;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async find(): Promise<Responsible[]> {
    const responsible = await this.ormRepository.find({
      order: {
        created_at: 'ASC',
      },
    });
    return responsible;
  }

  public async findById(id: string): Promise<Responsible | undefined> {
    const reminder = await this.ormRepository.findOne({
      where: { id },
    });
    return reminder;
  }

  public async findByCPF(cpf: string): Promise<Responsible | undefined> {
    const reminder = await this.ormRepository.findOne({
      where: { cpf },
    });
    return reminder;
  }
}

export default ResponsibleRepository;
