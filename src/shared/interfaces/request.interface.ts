import { Request } from 'express';

export interface IRequest extends Request {
  user: { name: string; email: string; sub: string; iat: number; exp: number };
  operation: string;
  duration: number;
  durationUnit: string;
}
