import { Router } from 'express';
import acl from 'express-acl';

// config
import { config, responseObject } from '@config/acl';

// router version
import v1 from './api/v1';

/* acl config */
acl.config(config, responseObject);

// create router
const routes = Router();

// using version one from API
routes.use('/api/v1', v1);

export default routes;
