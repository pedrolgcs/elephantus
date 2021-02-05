import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// controllers
import NurseriesController from '../controllers/NurseriesController';

// inicialize
const nurseryRouter = Router();
const nurseriesController = new NurseriesController();

// acl
nurseryRouter.use(ensureAuthenticated);
nurseryRouter.use(acl.authorize);

// routes
nurseryRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      city: Joi.string().default('Acari'),
    },
  }),
  nurseriesController.index,
);

nurseryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      city: Joi.string().required(),
    },
  }),
  nurseriesController.create,
);

nurseryRouter.get(
  '/:nursery_id',
  celebrate({
    [Segments.PARAMS]: {
      nursery_id: Joi.string().required().uuid(),
    },
  }),
  nurseriesController.show,
);

nurseryRouter.put(
  '/:nursery_id',
  celebrate({
    [Segments.PARAMS]: {
      nursery_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      city: Joi.string().required(),
    },
  }),
  nurseriesController.update,
);

nurseryRouter.delete(
  '/:nursery_id',
  celebrate({
    [Segments.PARAMS]: {
      nursery_id: Joi.string().required().uuid(),
    },
  }),
  nurseriesController.delete,
);

export default nurseryRouter;
