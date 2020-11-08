import { Repository, getRepository } from 'typeorm';

// repository
import INoticesRepository from '@modules/notices/repositories/INoticesRepository';

// dtos
import ICreateNoticeDTO from '@modules/notices/dtos/ICreateNoticeDTO';

// entities
import Notice from '@modules/notices/infra/typeorm/entities/notice';

class NoticesRepository implements INoticesRepository {
  private ormRepository: Repository<Notice>;

  constructor() {
    this.ormRepository = getRepository(Notice);
  }

  public async create(data: ICreateNoticeDTO): Promise<Notice> {
    const notice = await this.ormRepository.create(data);
    await this.ormRepository.save(notice);
    return notice;
  }

  public async save(notice: Notice): Promise<Notice> {
    return this.ormRepository.save(notice);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async find(): Promise<Notice[]> {
    const notices = await this.ormRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
    return notices;
  }

  public async findById(id: string): Promise<Notice | undefined> {
    const notice = await this.ormRepository.findOne({
      where: { id },
      relations: ['classroom'],
    });
    return notice;
  }
}

export default NoticesRepository;
