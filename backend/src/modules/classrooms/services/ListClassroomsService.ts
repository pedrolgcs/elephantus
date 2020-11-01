import { injectable, inject } from 'tsyringe';

// entities
import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

// repositories
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

interface IRequest {
  name: string;
}

@injectable()
class ListClassroomsService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Classroom[]> {
    const classrooms = await this.classroomsRepository.find(name);

    return classrooms;
  }
}

export default ListClassroomsService;
