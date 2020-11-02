import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Classroom from '@modules/classrooms/infra/typeorm/entities/Classroom';

// repositories
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';

interface IRequest {
  name: string;
  shift: 'morning' | 'afternoon' | 'night';
  user_id?: string;
}

@injectable()
class CreateClassroomService {
  constructor(
    @inject('ClassroomsRepository')
    private classroomsRepository: IClassroomsRepository,
  ) {}

  public async execute({ name, shift, user_id }: IRequest): Promise<Classroom> {
    const checkClassroomExists = await this.classroomsRepository.findByNameAndShift(
      name,
      shift,
    );

    if (checkClassroomExists) {
      throw new AppError('Class name already used in this shift');
    }

    const classroom = await this.classroomsRepository.create({
      name,
      shift,
      user_id,
    });

    return classroom;
  }
}

export default CreateClassroomService;
