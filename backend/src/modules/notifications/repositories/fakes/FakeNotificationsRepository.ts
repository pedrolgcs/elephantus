import { v4 } from 'uuid';

// entities
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

// dtos
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

// repository
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

class FakeNoticesRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create(data: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();
    Object.assign(notification, { id: v4() }, data);
    this.notifications.push(notification);
    return notification;
  }
}

export default FakeNoticesRepository;
