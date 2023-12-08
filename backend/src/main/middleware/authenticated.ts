import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '@/domain/entities/errors';
import { unauthenticated } from '@/application/helpers';
import { verify } from 'jsonwebtoken';

type Payload = {
  sub: string;
};

export function authenticate(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    throw new AuthenticationError('AUTHENTICATE.ERRORS.TOKEN_MISSING');
  }
  const [, token] = authToken.split(' ');
  try {
    const { sub } = verify(token, process.env.TOKEN_KEY) as Payload;
    request.body.user_id = sub;

    return next();
  } catch (error) {
    if (error instanceof AuthenticationError) return unauthenticated(error);

    throw error;
  }
}
