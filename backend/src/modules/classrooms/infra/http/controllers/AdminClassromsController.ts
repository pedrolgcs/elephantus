import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// services
import ListClassroomsService from '@modules/classrooms/services/ListClassroomsService';

class ClassroomsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, nursery } = request.query;

    const listClassrooms = container.resolve(ListClassroomsService);

    const classrooms = await listClassrooms.execute({
      name: name.toString(),
      nursery: nursery.toString(),
    });

    return response.status(200).json(classToClass(classrooms));
  }
}

export default ClassroomsController;
