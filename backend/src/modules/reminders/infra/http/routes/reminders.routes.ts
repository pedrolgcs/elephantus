import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// controllers
import RemindersController from '../controllers/RemindersController';

// inicialize
const reminderRouter = Router();
const reminderController = new RemindersController();

/**
 * Show all reminder by classroom
 */
reminderRouter.get(
  '/:classroom_id',
  celebrate({
    [Segments.PARAMS]: {
      classroom_id: Joi.string().uuid().required(),
    },
  }),
  reminderController.index,
);

// acl
reminderRouter.use(ensureAuthenticated);
reminderRouter.use(acl.authorize);

/**
 * Create a new reminder
 */
reminderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string(),
      day: Joi.string()
        .valid('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat')
        .required(),
      classroom_id: Joi.string().uuid().required(),
    },
  }),
  reminderController.create,
);

/**
 * Update reminder by ID
 */
reminderRouter.put(
  '/:reminder_id',
  celebrate({
    [Segments.PARAMS]: {
      reminder_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  reminderController.update,
);

/**
 * Delete notice by ID
 */
reminderRouter.delete(
  '/:reminder_id',
  celebrate({
    [Segments.PARAMS]: {
      reminder_id: Joi.string().uuid().required(),
    },
  }),
  reminderController.delete,
);

export default reminderRouter;
