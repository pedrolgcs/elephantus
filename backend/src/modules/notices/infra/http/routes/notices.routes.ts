import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// controllers
import NoticesController from '../controllers/NoticesController';

// inicialize
const noticeRouter = Router();
const noticeController = new NoticesController();

// acl
noticeRouter.use(ensureAuthenticated);
noticeRouter.use(acl.authorize);

noticeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      all: Joi.boolean().default(false),
      notice: Joi.string().required(),
      classroom_id: Joi.string().uuid(),
    },
  }),
  noticeController.create,
);

noticeRouter.get(
  '/:notice_id',
  celebrate({
    [Segments.PARAMS]: {
      notice_id: Joi.string().uuid().required(),
    },
  }),
  noticeController.show,
);

export default noticeRouter;
