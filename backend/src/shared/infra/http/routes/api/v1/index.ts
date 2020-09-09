import { Router } from 'express';

// routes
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import classroomsRouter from '@modules/classrooms/infra/http/routes/classrooms.routes';

// inicialize Router
const routes = Router();

// index
routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello from API V1' });
});

/* roles
 * [CRUD]
 */
routes.use('/roles', rolesRouter);

/* users
 * [CRUD]
 */
routes.use('/users', usersRouter);

/* password
 * [POST]
 */
routes.use('/password', passwordRouter);

/* sessions
 * [POST]
 */
routes.use('/sessions', sessionsRouter);

/* profile
 * [GET], [PUT]
 * /avatar => [PATCH]
 */
routes.use('/profile', profileRouter);

/* classrooms
 * [CRUD]
 */
routes.use('/classrooms', classroomsRouter);

export default routes;
