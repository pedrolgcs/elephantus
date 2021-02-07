import { injectable, inject } from 'tsyringe';

// entities
import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

// repositories
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

interface IRequest {
  name: string;
  nursery: string;
}

@injectable()
class ListClassroomsService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({ name, nursery }: IRequest): Promise<Classroom[]> {
    const classrooms = await this.classroomsRepository.find(name);

    // TODO refactor later (now = take all and filter for nursery)
    const filterClassrooms = classrooms.filter(
      classroom => classroom.user.nursery_id === nursery,
    );

    return filterClassrooms;
  }
}

export default ListClassroomsService;
