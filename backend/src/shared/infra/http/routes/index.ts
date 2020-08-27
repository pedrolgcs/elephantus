import { Router } from 'express';

// router version
import v1 from './api/v1';

// create router
const routes = Router();

// using version one from API
routes.use('/api/v1', v1);

export default routes;
