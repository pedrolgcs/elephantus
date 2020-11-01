import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import ListClassroomsService from '@modules/classrooms/services/ListClassroomsService';
import CreateClassroomService from '@modules/classrooms/services/CreateClassroomService';

class ClassroomsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const listClassrooms = container.resolve(ListClassroomsService);

    const classrooms = await listClassrooms.execute({ name: name.toString() });

    return response.status(200).json(classrooms);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, shift, user_id } = request.body;

    const createClassroom = container.resolve(CreateClassroomService);

    const classroom = await createClassroom.execute({ name, shift, user_id });

    return response.status(201).json(classroom);
  }
}

export default ClassroomsController;
