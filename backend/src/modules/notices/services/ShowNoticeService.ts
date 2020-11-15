import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Notice from 'modules/notices/infra/typeorm/entities/notice';

// interfaces
import INoticesRepository from 'modules/notices/repositories/INoticesRepository';

interface IRequest {
  notice_id: string;
}

@injectable()
class ShowNoticeService {
  constructor(
    @inject('NoticesRepository')
    private noticesRepository: INoticesRepository,
  ) {}

  public async execute({ notice_id }: IRequest): Promise<Notice> {
    const notice = await this.noticesRepository.findById(notice_id);

    if (!notice) {
      throw new AppError('Notice not found', 400);
    }

    return notice;
  }
}

export default ShowNoticeService;
