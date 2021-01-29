import { Router } from 'express';

// routes
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import classroomsRouter from '@modules/classrooms/infra/http/routes/classrooms.routes';
import noticesRouter from '@modules/notices/infra/http/routes/notices.routes';
import remindersRouter from '@modules/reminders/infra/http/routes/reminders.routes';
import responsibleRouter from '@modules/responsible/infra/http/routes/responsible.routes';

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

/* notices
 * [CRUD]
 */
routes.use('/notices', noticesRouter);

/* reminders
 * [GET], [POST], [PUT], [DELETE]
 */
routes.use('/reminders', remindersRouter);

/* reminders
 * [CRUD]
 * [GET] /auth for Auth
 */
routes.use('/responsible', responsibleRouter);

export default routes;
