import { Request, Response } from 'express';
import { container } from 'tsyringe';

// services
import ListNoticesService from '@modules/notices/services/ListNoticesService';
import CreateNoticeService from '@modules/notices/services/CreateNoticeService';
import ShowNoticeService from '@modules/notices/services/ShowNoticeService';
import UpdateNoticeService from '@modules/notices/services/UpdateNoticeService';
import DeleteNoticeService from '@modules/notices/services/DeleteNoticeService';

class NoticesController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listNotices = container.resolve(ListNoticesService);

    const notices = await listNotices.execute();

    return response.status(200).json(notices);
  }

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { notice_id } = request.params;
    const { title, notice } = request.body;

    const updateNotice = container.resolve(UpdateNoticeService);

    const updatedNotice = await updateNotice.execute({
      notice_id,
      title,
      notice,
    });

    return response.status(201).json(updatedNotice);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { notice_id } = request.params;

    const deleteNotice = container.resolve(DeleteNoticeService);

    await deleteNotice.execute({ notice_id });

    return response.status(204).send();
  }
}

export default NoticesController;
