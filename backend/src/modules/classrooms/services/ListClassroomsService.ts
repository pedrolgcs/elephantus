import { injectable, inject } from 'tsyringe';

// entities
import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

// repositories
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

// dtos
import IFiltersClassroomDTO from '@modules/classrooms/dtos/IFiltersClassroomDTO';

interface IRequest {
  filters: IFiltersClassroomDTO;
  user_id: string;
}

@injectable()
class ListClassroomsService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({ user_id, filters }: IRequest): Promise<Classroom[]> {
    const classrooms = await this.classroomsRepository.find(user_id, filters);

    return classrooms;
  }
}

export default ListClassroomsService;
