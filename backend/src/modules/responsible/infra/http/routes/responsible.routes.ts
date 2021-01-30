import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// controllers
import ResponsibleController from '../controllers/ResponsibleController';
import ResponsibleAuthenticatedController from '../controllers/ResponsibleAuthenticatedController';

// inicialize
const responsibleRouter = Router();
const responsibleController = new ResponsibleController();
const responsibleAuthenticatedController = new ResponsibleAuthenticatedController();

/**
 * Using for Authenticate responsible in mobile app
 */
responsibleRouter.get(
  '/auth/:cpf',
  celebrate({
    [Segments.PARAMS]: {
      cpf: Joi.string().min(11).required(),
    },
  }),
  responsibleAuthenticatedController.show,
);

// acl
responsibleRouter.use(ensureAuthenticated);
responsibleRouter.use(acl.authorize);

/**
 * Show all responsibles with all is true
 */
responsibleRouter.get('/', responsibleController.index);

/**
 * Create a new notice
 */
responsibleRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().required().min(11),
      name: Joi.string().required(),
      phone: Joi.string().required(),
      city: Joi.string(),
      neighborhood: Joi.string(),
      street: Joi.string(),
      number: Joi.string(),
    },
  }),
  responsibleController.create,
);

/**
 * Show responsible by ID
 */
responsibleRouter.get(
  '/:responsible_id',
  celebrate({
    [Segments.PARAMS]: {
      responsible_id: Joi.string().uuid().required(),
    },
  }),
  responsibleController.show,
);

/**
 * Update notice by ID
 */
responsibleRouter.put(
  '/:responsible_id',
  celebrate({
    [Segments.PARAMS]: {
      responsible_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      cpf: Joi.string().required().min(11),
      name: Joi.string().required(),
      phone: Joi.string().required(),
      city: Joi.string(),
      neighborhood: Joi.string(),
      street: Joi.string(),
      number: Joi.string(),
    },
  }),
  responsibleController.update,
);

/**
 * Delete notice by ID
 */
responsibleRouter.delete(
  '/:responsible_id',
  celebrate({
    [Segments.PARAMS]: {
      responsible_id: Joi.string().uuid().required(),
    },
  }),
  responsibleController.delete,
);

export default responsibleRouter;
