import { IToken } from '../../../src/resources/auth/entities/auth.entity.js';

declare global {
  namespace Express {
    export interface Request {
      __user: IToken;
    }
  }
}
