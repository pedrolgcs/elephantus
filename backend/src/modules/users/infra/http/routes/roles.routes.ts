import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// controllers
import RolesController from '../controllers/RolesController';

// inicialize
const roleRouter = Router();
const rolesController = new RolesController();

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
