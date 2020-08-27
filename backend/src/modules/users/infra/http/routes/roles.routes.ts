import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import acl from 'express-acl';

// controllers
import RolesController from '../controllers/RolesController';

// Middleware
import { auth } from '../middlewares/ensureAuthenticated';

// inicialize
const roleRouter = Router();
const rolesController = new RolesController();

// acl
roleRouter.use(auth);
roleRouter.use(acl.authorize);

// routes
roleRouter.get('/', rolesController.index);

roleRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  rolesController.create,
);

roleRouter.get(
  '/:role_id',
  celebrate({
    [Segments.PARAMS]: {
      role_id: Joi.string().required().uuid(),
    },
  }),
  rolesController.show,
);

roleRouter.delete(
  '/:role_id',
  celebrate({
    [Segments.PARAMS]: {
      role_id: Joi.string().required().uuid(),
    },
  }),
  rolesController.delete,
);

export default roleRouter;
