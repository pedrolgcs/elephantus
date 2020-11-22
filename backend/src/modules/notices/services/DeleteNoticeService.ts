import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// interfaces
import INoticesRepository from 'modules/notices/repositories/INoticesRepository';

interface IRequest {
  notice_id: string;
}

@injectable()
class DeleteNoticeService {
  constructor(
    @inject('NoticesRepository')
    private noticesRepository: INoticesRepository,
  ) {}

  public async execute({ notice_id }: IRequest): Promise<void> {
    const notice = await this.noticesRepository.findById(notice_id);

    if (!notice) {
      throw new AppError('Notice not found', 400);
    }

    await this.noticesRepository.deleteById(notice_id);
  }
}

export default DeleteNoticeService;
