import { Router } from 'express';
import acl from 'express-acl';

// router version
import v1 from './api/v1';

/* acl config */
const configObject = {
  baseUrl: '/api/v1/',
  filename: 'nacl.json',
  path: 'src/config',
  roleSearchPath: 'user.role',
};
const responseObject = {
  status: 'Access Denied',
  message: 'You are not authorized to access this resource',
};

acl.config(configObject, responseObject);

// create router
const routes = Router();

// using version one from API
routes.use('/api/v1', v1);

export default routes;
