import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import acl from 'express-acl';

// Middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// controllers
import NoticesController from '../controllers/NoticesController';
import NoticesClassroomController from '../controllers/NoticesClassroomController';

// inicialize
const noticeRouter = Router();
const noticeController = new NoticesController();
const noticesClassroomController = new NoticesClassroomController();

/**
 * Show all notices with all is true
 */
noticeRouter.get('/', noticeController.index);

/**
 * Show notice by ID
 */
noticeRouter.get(
  '/:notice_id',
  celebrate({
    [Segments.PARAMS]: {
      notice_id: Joi.string().uuid().required(),
    },
  }),
  noticeController.show,
);

/**
 * Show notices by classroom_id
 */
noticeRouter.get(
  '/classrooms/:classroom_id',
  celebrate({
    [Segments.PARAMS]: {
      classroom_id: Joi.string().uuid().required(),
    },
  }),
  noticesClassroomController.index,
);

// acl
noticeRouter.use(ensureAuthenticated);
noticeRouter.use(acl.authorize);

/**
 * Create a new notice
 */
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

/**
 * Update a notice by ID
 */
noticeRouter.put(
  '/:notice_id',
  celebrate({
    [Segments.PARAMS]: {
      notice_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      notice: Joi.string().required(),
    },
  }),
  noticeController.update,
);

export default noticeRouter;
