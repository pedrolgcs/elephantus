import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

// config
import authConfig from '@config/auth';

interface ITokenPayload {
  role: string;
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JTW token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, role } = decoded as ITokenPayload;

    /* review later */
    // request.decoded = decoded as ITokenPayload;

    request.user = {
      id: sub,
      role,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
