import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import CreateClassroomService from '@modules/classrooms/services/CreateClassroomService';

class ClassroomsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, shift, user_id } = request.body;

    const createClassroom = container.resolve(CreateClassroomService);

    const classroom = await createClassroom.execute({ name, shift, user_id });

    return response.status(201).json(classroom);
  }
}

export default ClassroomsController;
