import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider.js';
import * as schema from '../../drizzle/schema.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.db.insert(schema.users).values(createUserDto).returning();
  }

  findAll() {
    return this.db.select().from(schema.users).limit(500);
  }

  findOne(id: string) {
    return this.db.select().from(schema.users).where(eq(schema.users.id, id));
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.db
      .update(schema.users)
      .set(updateUserDto)
      .where(eq(schema.users.id, id))
      .returning();
  }

  remove(id: string) {
    return this.db
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning();
  }
}
