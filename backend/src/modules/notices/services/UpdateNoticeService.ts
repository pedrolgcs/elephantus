import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// entities
import Notice from 'modules/notices/infra/typeorm/entities/Notice';

// interfaces
import INoticesRepository from 'modules/notices/repositories/INoticesRepository';

interface IRequest {
  notice_id: string;
  title: string;
  notice: string;
}

@injectable()
class UpdateNoticeService {
  constructor(
    @inject('NoticesRepository')
    private noticesRepository: INoticesRepository,
  ) {}

  public async execute({
    notice_id,
    title,
    notice,
  }: IRequest): Promise<Notice> {
    const existingNotice = await this.noticesRepository.findById(notice_id);

    if (!existingNotice) {
      throw new AppError('Notice not found', 400);
    }

    const updatedNotice = Object.assign(existingNotice, { title, notice });

    await this.noticesRepository.save(updatedNotice);

    return updatedNotice;
  }
}

export default UpdateNoticeService;
