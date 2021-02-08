import { injectable, inject } from 'tsyringe';

// entities
import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

// repositories
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

interface IRequest {
  teacher_id: string;
}

@injectable()
class ListClassroomsByUserService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({ teacher_id }: IRequest): Promise<Classroom[]> {
    const classrooms = await this.classroomsRepository.findByTeacher(
      teacher_id,
    );

    return classrooms;
  }
}

export default ListClassroomsByUserService;
