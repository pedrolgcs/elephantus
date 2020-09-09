import { container } from 'tsyringe';

// global Providers
import './providers';

// users Providers
import '@modules/users/providers';

// roles Repository
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

// users Repository
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// classrooms Repository
import IClassroomsRepository from '@modules/classrooms/repositories/IClassroomsRepository';
import ClassroomsRepository from '@modules/classrooms/infra/typeorm/repositories/ClassroomsRepository';

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
