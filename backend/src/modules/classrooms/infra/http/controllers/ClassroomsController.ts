import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// services
import ListClassroomsService from '@modules/classrooms/services/ListClassroomsService';
import CreateClassroomService from '@modules/classrooms/services/CreateClassroomService';
import ShowClassroomService from '@modules/classrooms/services/ShowClassroomService';
import UpdateClassroomService from '@modules/classrooms/services/UpdateClassroomService';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const { classroom_id } = request.params;

    const showClassroom = container.resolve(ShowClassroomService);

    const classroom = await showClassroom.execute({ classroom_id });

    return response.status(200).json(classToClass(classroom));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { classroom_id } = request.params;
    const { name, shift, user_id } = request.body;

    const updateClassroom = container.resolve(UpdateClassroomService);

    const classroom = await updateClassroom.execute({
      classroom_id,
      name,
      shift,
      user_id,
    });

    return response.status(201).json(classToClass(classroom));
  }
}

export default ClassroomsController;
