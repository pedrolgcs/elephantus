import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// services
import ListClassroomsService from '@modules/classrooms/services/ListClassroomsService';
import CreateClassroomService from '@modules/classrooms/services/CreateClassroomService';
import ShowClassroomService from '@modules/classrooms/services/ShowClassroomService';
import UpdateClassroomService from '@modules/classrooms/services/UpdateClassroomService';
import DeleteClassroomService from '@modules/classrooms/services/DeleteClassroomService';

// dtos
import IFiltersClassroomDTO from '@modules/classrooms/dtos/IFiltersClassroomDTO';

class ClassroomsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { name, shift } = request.query;

    const filters = {
      name,
      shift,
    } as IFiltersClassroomDTO;

    const listClassrooms = container.resolve(ListClassroomsService);

    const classrooms = await listClassrooms.execute({
      user_id,
      filters,
    });

    return response.status(200).json(classToClass(classrooms));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, shift, teacher_id } = request.body;
    const { id: user_id } = request.user;

    const createClassroom = container.resolve(CreateClassroomService);

    const classroom = await createClassroom.execute({
      name,
      shift,
      user_id,
      teacher_id,
    });

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
    const { name, shift, teacher_id } = request.body;
    const { id: user_id } = request.user;

    const updateClassroom = container.resolve(UpdateClassroomService);

    const classroom = await updateClassroom.execute({
      classroom_id,
      name,
      shift,
      user_id,
      teacher_id,
    });

    return response.status(201).json(classToClass(classroom));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { classroom_id } = request.params;

    const deleteClassroom = container.resolve(DeleteClassroomService);

    await deleteClassroom.execute({ classroom_id, user_id });

    return response.status(204).send();
  }
}

export default ClassroomsController;
