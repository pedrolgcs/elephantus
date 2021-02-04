// dtos
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

// schemas
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
