import { Router } from 'express';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// controllers
import UserClassroomsController from '../controllers/UserClassroomsController';

// inicialize
const userClassroomsRouter = Router();
const userClassroomsController = new UserClassroomsController();

// acl
userClassroomsRouter.use(ensureAuthenticated);
userClassroomsRouter.use(acl.authorize);

userClassroomsRouter.get('/list', userClassroomsController.index);

export default userClassroomsRouter;
