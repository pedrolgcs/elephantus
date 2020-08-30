import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

// config
import uploadConfig from '@config/upload';

// controllers
import ProfileController from '../controllers/ProfileController';
import UserAvatarController from '../controllers/UserAvatarController';

// Middleware
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// inicialize
const profileRouter = Router();
const profileController = new ProfileController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer);

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

profileRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

export default profileRouter;
