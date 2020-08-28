import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// controllers
import ProfileController from '../controllers/ProfileController';

// Middleware
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// inicialize
const profileRouter = Router();
const profileController = new ProfileController();

// auth
profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
    },
  }),
  profileController.update,
);

export default profileRouter;
