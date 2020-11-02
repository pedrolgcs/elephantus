import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// controllers
import ClassroomsController from '../controllers/ClassroomsController';

// inicialize
const classroomsRouter = Router();
const classroomsController = new ClassroomsController();

// acl
classroomsRouter.use(ensureAuthenticated);
classroomsRouter.use(acl.authorize);

classroomsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().default(''),
    },
  }),
  classroomsController.index,
);

classroomsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      shift: Joi.string().valid('morning', 'afternoon', 'night').required(),
      user_id: Joi.string().uuid().required(),
    },
  }),
  classroomsController.create,
);

classroomsRouter.get(
  '/:classroom_id',
  celebrate({
    [Segments.PARAMS]: {
      classroom_id: Joi.string().uuid().required(),
    },
  }),
  classroomsController.show,
);

export default classroomsRouter;
