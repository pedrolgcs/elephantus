import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

// repositories
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

interface IRequest {
  classroom_id: string;
}

@injectable()
class ShowClassroomService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({ classroom_id }: IRequest): Promise<Classroom> {
    const classroom = await this.classroomsRepository.findById(classroom_id);

    if (!classroom) {
      throw new AppError('classroom does not exists', 400);
    }

    return classroom;
  }
}

export default ShowClassroomService;
