import { injectable, inject } from 'tsyringe';

// entities
import Notice from '@modules/notices/infra/typeorm/entities/Notice';

// interfaces
import INoticesRepository from '@modules/notices/repositories/INoticesRepository';

interface IRequest {
  classroom_id: string;
}

@injectable()
class ListNoticesClassroomService {
  constructor(
    @inject('NoticesRepository')
    private noticesRepository: INoticesRepository,
  ) {}

  public async execute({ classroom_id }: IRequest): Promise<Notice[]> {
    const notices = await this.noticesRepository.findByClassroom(classroom_id);
    return notices;
  }
}

export default ListNoticesClassroomService;
