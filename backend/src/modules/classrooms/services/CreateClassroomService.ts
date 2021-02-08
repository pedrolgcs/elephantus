import { injectable, inject } from 'tsyringe';

// entities
import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

// repositories
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

interface IRequest {
  name: string;
  shift: 'morning' | 'afternoon' | 'night';
  user_id: string;
  teacher_id?: string;
}

@injectable()
class CreateClassroomService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({
    name,
    shift,
    user_id,
    teacher_id,
  }: IRequest): Promise<Classroom> {
    const classroom = await this.classroomsRepository.create({
      name,
      shift,
      user_id,
      teacher_id,
    });

    return classroom;
  }
}

export default CreateClassroomService;
