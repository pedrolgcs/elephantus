import { container } from 'tsyringe';

// global Providers
import './providers';

// users Providers
import '@modules/users/providers';

// nurseries Repository
import INurseriesRepository from '@modules/nurseries/repositories/INurseriesRepository';
import NurseryRepository from '@modules/nurseries/infra/typeorm/repositories/NurseryRepository';

// roles Repository
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

// users Repository
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// classrooms Repository
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';
import ClassroomsRepository from '@modules/classrooms/infra/typeorm/repositories/ClassroomsRepository';

// notices Repository
import INoticesRepository from '@modules/notices/repositories/INoticesRepository';
import NoticesRepository from '@modules/notices/infra/typeorm/repositories/NoticesRepository';

// reminders Repository
import IRemindersRepository from '@modules/reminders/repositories/IRemindersRepository';
import RemindersRepository from 'modules/reminders/infra/typeorm/repositories/RemindersRepository';

// responsible Repository
import IResponsibleRepository from '@modules/responsible/repositories/IResponsibleRepository';
import ResponsibleRepository from 'modules/responsible/infra/typeorm/repositories/ResponsibleRepository';

// Notifications
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<INurseriesRepository>(
  'NurseryRepository',
  NurseryRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IClassroomsRepository>(
  'ClassroomsRepository',
  ClassroomsRepository,
);

container.registerSingleton<INoticesRepository>(
  'NoticesRepository',
  NoticesRepository,
);

container.registerSingleton<IRemindersRepository>(
  'RemindersRepository',
  RemindersRepository,
);

container.registerSingleton<IResponsibleRepository>(
  'ResponsibleRepository',
  ResponsibleRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
