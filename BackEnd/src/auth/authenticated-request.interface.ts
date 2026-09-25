import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    traderId: string;
    brokerId: string;
  };
}
