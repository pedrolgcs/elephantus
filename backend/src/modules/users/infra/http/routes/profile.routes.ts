import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

// controllers
import ProfileController from '../controllers/ProfileController';

// Middleware
import { auth } from '../middlewares/ensureAuthenticated';

// inicialize
const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/', auth, profileController.show);

export default profileRouter;
