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
  user_id?: string;
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
  }: IRequest): Promise<Classroom> {
    const classroom = await this.classroomsRepository.findById(classroom_id);

    if (!classroom) {
      throw new AppError('classroom does not exists', 400);
    }

    const classroomWithSameNameAndShift = await this.classroomsRepository.findByNameAndShift(
      name,
      shift,
    );

    if (
      classroomWithSameNameAndShift &&
      classroomWithSameNameAndShift.id !== classroom_id
    ) {
      throw new AppError('Classroom name already exists in this shift');
    }

    const updatedClassroom = Object.assign(classroom, { name, shift, user_id });

    return this.classroomsRepository.save(updatedClassroom);
  }
}

export default UpdateClassroomService;
