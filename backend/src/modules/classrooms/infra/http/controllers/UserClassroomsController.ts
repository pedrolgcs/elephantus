import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// services
import ListClassroomsByUserService from '@modules/classrooms/services/ListClassroomsByUserService';

class ClassroomsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listClassroomsByUser = container.resolve(ListClassroomsByUserService);

    const classrooms = await listClassroomsByUser.execute({
      teacher_id: user_id,
    });

    return response.status(200).json(classToClass(classrooms));
  }
}

export default ClassroomsController;
