import { InsertUser } from '../../../drizzle/types.js';

export class CreateUserDto implements InsertUser {
  password: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
}
