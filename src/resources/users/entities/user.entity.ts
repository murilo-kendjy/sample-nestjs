import { SelectUser } from 'src/drizzle/types.js';

export class User implements SelectUser {
  password: string;
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
