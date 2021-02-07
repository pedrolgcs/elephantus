import { Router } from 'express';

// routes
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import classroomsRouter from '@modules/classrooms/infra/http/routes/classrooms.routes';
import userClassroomsRouter from '@modules/classrooms/infra/http/routes/userClassrooms.routes';
import noticesRouter from '@modules/notices/infra/http/routes/notices.routes';
import remindersRouter from '@modules/reminders/infra/http/routes/reminders.routes';
import responsibleRouter from '@modules/responsible/infra/http/routes/responsible.routes';
import nurseriesRouter from '@modules/nurseries/infra/http/routes/nurseries.routes';
// admin
import adminClassroomsRouter from '@modules/classrooms/infra/http/routes/adminClassrooms.routes';

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

/* nurseries
 * [CRUD]
 */
routes.use('/nurseries', nurseriesRouter);

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

/* user classrooms
 * [index]
 */
routes.use('/classrooms/user', userClassroomsRouter);

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

/**
 * Admin Routes
 */
routes.use('/admin/classrooms', adminClassroomsRouter);

export default routes;
