import { injectable, inject } from 'tsyringe';

// entities
import Notice from '@modules/notices/infra/typeorm/entities/notice';

// interfaces
import INoticesRepository from '@modules/notices/repositories/INoticesRepository';

interface IRequest {
  title: string;
  notice: string;
  classroom_id?: string;
}

@injectable()
class CreateNoticeService {
  constructor(
    @inject('NoticesRepository')
    private noticesRepository: INoticesRepository,
  ) {}

  public async execute({
    title,
    notice,
    classroom_id,
  }: IRequest): Promise<Notice> {
    const newNotice = await this.noticesRepository.create({
      title,
      notice,
      classroom_id,
    });

    return newNotice;
  }
}

export default CreateNoticeService;
