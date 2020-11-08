import { v4 } from 'uuid';

// entities
import Notice from '@modules/notices/infra/typeorm/entities/notice';

// dtos
import ICreateNoticeDTO from '@modules/notices/dtos/ICreateNoticeDTO';

// repository
import INoticeRepository from '@modules/notices/repositories/INoticesRepository';

class FakeNoticesRepository implements INoticeRepository {
  private notices: Notice[] = [];

  public async create(data: ICreateNoticeDTO): Promise<Notice> {
    const notice = new Notice();
    Object.assign(notice, { id: v4() }, data);
    this.notices.push(notice);
    return notice;
  }

  public async save(notice: Notice): Promise<Notice> {
    const findIndex = this.notices.findIndex(
      element => element.id === notice.id,
    );
    this.notices[findIndex] = notice;
    return notice;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.notices.findIndex(element => element.id === id);
    this.notices.splice(findIndex, 1);
  }

  public async find(): Promise<Notice[]> {
    return this.notices;
  }

  public async findById(id: string): Promise<Notice | undefined> {
    const notice = this.notices.find(element => element.id === id);
    return notice;
  }
}

export default FakeNoticesRepository;
