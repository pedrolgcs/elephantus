import { injectable, inject } from 'tsyringe';

// entities
import Notice from '@modules/notices/infra/typeorm/entities/Notice';

// interfaces
import INoticesRepository from '@modules/notices/repositories/INoticesRepository';

@injectable()
class ListNoticesService {
  constructor(
    @inject('NoticesRepository')
    private noticesRepository: INoticesRepository,
  ) {}

  public async execute(): Promise<Notice[]> {
    const notices = await this.noticesRepository.find();
    return notices;
  }
}

export default ListNoticesService;
