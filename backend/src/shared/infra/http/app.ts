import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import express, { json, Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';

import routes from './routes';

/* dabatase connection */
import '@shared/infra/typeorm';

/* providers */
import '@shared/container';

/* create express application */
const app = express();

/* middlewares */
app.use(json());

/* routes */
app.use(routes);

/* celebrate validation errors */
app.use(errors());

/* erros */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server Error',
  });
});

export default app;
