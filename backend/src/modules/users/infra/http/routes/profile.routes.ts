import { Router } from 'express';

// controllers
import ProfileController from '../controllers/ProfileController';

// Middleware
import { auth } from '../middlewares/ensureAuthenticated';

// inicialize
const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(auth);

profileRouter.get('/', profileController.show);

export default profileRouter;
