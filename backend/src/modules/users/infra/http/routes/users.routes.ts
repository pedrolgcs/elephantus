import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import acl from 'express-acl';

// controllers
import UsersController from '../controllers/UsersController';

// Middleware
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// inicialize
const userRouter = Router();
const usersController = new UsersController();

// acl
userRouter.use(ensureAuthenticated);
userRouter.use(acl.authorize);

// routes
userRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().default(''),
    },
  }),
  usersController.index,
);

userRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role_id: Joi.string().uuid(),
    },
  }),
  usersController.create,
);

userRouter.put(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string(),
      email: Joi.string().email().required(),
      role_id: Joi.string().uuid(),
    },
  }),
  usersController.update,
);

userRouter.delete(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  usersController.delete,
);

export default userRouter;
