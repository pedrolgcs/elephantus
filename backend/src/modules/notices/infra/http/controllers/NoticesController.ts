import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import CreateNoticeService from '@modules/notices/services/CreateNoticeService';

class NoticesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, notice, classroom_id } = request.body;

    const createNotice = container.resolve(CreateNoticeService);

    const newNotice = await createNotice.execute({
      title,
      notice,
      classroom_id,
    });

    return response.status(201).json(newNotice);
  }
}

export default NoticesController;
