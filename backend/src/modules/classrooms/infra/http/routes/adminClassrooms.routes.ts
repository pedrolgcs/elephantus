import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// controllers
import AdminClassromsController from '../controllers/AdminClassromsController';

// inicialize
const adminClassroomsRouter = Router();
const adminClassromsController = new AdminClassromsController();

// acl
adminClassroomsRouter.use(ensureAuthenticated);
adminClassroomsRouter.use(acl.authorize);

adminClassroomsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().default(''),
      nursery: Joi.string().uuid().required(),
    },
  }),
  adminClassromsController.index,
);

export default adminClassroomsRouter;
