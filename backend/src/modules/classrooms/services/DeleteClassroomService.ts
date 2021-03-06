import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// repositories
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

interface IRequest {
  classroom_id: string;
  user_id: string;
}

@injectable()
class DeleteClassroomService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({ classroom_id, user_id }: IRequest): Promise<void> {
    const classroom = await this.classroomsRepository.findById(classroom_id);

    if (!classroom) {
      throw new AppError('classroom does not exists', 400);
    }

    if (classroom.user_id !== user_id) {
      throw new AppError("This classroom doesn't belong to you", 400);
    }

    await this.classroomsRepository.deleteById(classroom_id);
  }
}

export default DeleteClassroomService;
