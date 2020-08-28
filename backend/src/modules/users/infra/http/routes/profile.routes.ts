import { Router } from 'express';

// controllers
import ProfileController from '../controllers/ProfileController';

// Middleware
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// inicialize
const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

export default profileRouter;
