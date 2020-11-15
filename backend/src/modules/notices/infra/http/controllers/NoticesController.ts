import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import CreateNoticeService from '@modules/notices/services/CreateNoticeService';
import ShowNoticeService from '@modules/notices/services/ShowNoticeService';

class NoticesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, notice, all, classroom_id } = request.body;

    const createNotice = container.resolve(CreateNoticeService);

    const newNotice = await createNotice.execute({
      title,
      notice,
      all,
      classroom_id,
    });

    return response.status(201).json(newNotice);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { notice_id } = request.params;

    const showNotice = container.resolve(ShowNoticeService);

    const notice = await showNotice.execute({ notice_id });

    return response.status(200).json(notice);
  }
}

export default NoticesController;
