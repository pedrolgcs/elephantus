import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import acl from 'express-acl';

// controllers
import ResetPasswordController from '../controllers/ResetPasswordController';

// Middleware
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// Inicialize
const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();

// acl
passwordRouter.use(ensureAuthenticated);
passwordRouter.use(acl.authorize);

passwordRouter.post(
  '/reset/:user_id',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
    [Segments.PARAMS]: {
      user_id: Joi.string().required().uuid(),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
