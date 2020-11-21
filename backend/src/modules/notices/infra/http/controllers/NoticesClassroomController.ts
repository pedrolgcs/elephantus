import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import ListNoticesClassroom from '@modules/notices/services/ListNoticesClassroomService';

class NoticesClassroomController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { classroom_id } = request.params;

    const listNoticesClassroom = container.resolve(ListNoticesClassroom);

    const notices = await listNoticesClassroom.execute({ classroom_id });

    return response.status(200).json(notices);
  }
}

export default NoticesClassroomController;
