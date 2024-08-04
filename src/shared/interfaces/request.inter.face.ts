import { FastifyRequest } from 'fastify';

import { IDecodedToken } from './decodedToken.interface';

export interface IRequest extends FastifyRequest {
  user: IDecodedToken;
}
