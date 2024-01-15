import { IToken } from 'src/auth/entities/token.entity.js';

declare global {
  namespace Express {
    export interface Request {
      __user: IToken;
    }
  }
}
