import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

// repositories
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

interface IRequest {
  classroom_id: string;
  name: string;
  shift: 'morning' | 'afternoon' | 'night';
  user_id: string;
  teacher_id?: string;
}

@injectable()
class UpdateClassroomService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({
    classroom_id,
    name,
    shift,
    user_id,
    teacher_id,
  }: IRequest): Promise<Classroom> {
    const classroom = await this.classroomsRepository.findById(classroom_id);

    if (!classroom) {
      throw new AppError('classroom does not exists', 400);
    }

    if (classroom.user_id !== user_id) {
      throw new AppError("This classroom doesn't belong to you", 400);
    }

    const updatedClassroom = Object.assign(classroom, {
      name,
      shift,
      teacher_id,
    });

    return this.classroomsRepository.save(updatedClassroom);
  }
}

export default UpdateClassroomService;
