import Notice from '../infra/typeorm/entities/notice';

// dtos
import ICreateNoticeDTO from '../dtos/ICreateNoticeDTO';

export default interface INoticeRepository {
  create(data: ICreateNoticeDTO): Promise<Notice>;
  save(notice: Notice): Promise<Notice>;
  deleteById(id: string): Promise<void>;
  find(): Promise<Notice[]>;
  findById(id: string): Promise<Notice | undefined>;
}
