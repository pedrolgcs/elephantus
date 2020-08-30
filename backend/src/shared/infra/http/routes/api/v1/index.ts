import { Router } from 'express';

// routes
import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

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

/* sessions
 * [POST]
 */
routes.use('/sessions', sessionsRouter);

/* profile
 * [GET], [PUT]
 * /avatar => [PATCH]
 */
routes.use('/profile', profileRouter);

export default routes;
