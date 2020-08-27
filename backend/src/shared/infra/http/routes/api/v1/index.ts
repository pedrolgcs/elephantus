import { Router } from 'express';

import rolesRouter from '@modules/users/infra/http/routes/roles.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

// inicialize Router
const routes = Router();

/* index */
routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello from API V1' });
});

/* roles */
routes.use('/roles', rolesRouter);

/* users */
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

export default routes;
