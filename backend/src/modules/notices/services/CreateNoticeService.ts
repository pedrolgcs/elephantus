import { injectable, inject } from 'tsyringe';

// entities
import Notice from '@modules/notices/infra/typeorm/entities/Notice';

// interfaces
import INoticesRepository from '@modules/notices/repositories/INoticesRepository';

interface IRequest {
  title: string;
  notice: string;
  all: boolean;
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
    all,
    classroom_id,
  }: IRequest): Promise<Notice> {
    const newNotice = await this.noticesRepository.create({
      title,
      notice,
      all,
      classroom_id,
    });

    return newNotice;
  }
}

export default CreateNoticeService;
