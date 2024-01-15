import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider.js';
import * as schema from '../../drizzle/schema.js';
import { queryOne } from '../../utils/query.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserEntity } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.db
      .insert(schema.users)
      .values(createUserDto)
      .returning();

    return queryOne<UserEntity>(user);
  }

  async findAll() {
    return await this.db.select().from(schema.users).limit(500);
  }

  async findOne(id: string) {
    const user = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));

    return queryOne<UserEntity>(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.db
      .update(schema.users)
      .set(updateUserDto)
      .where(eq(schema.users.id, id))
      .returning();

    return queryOne<UserEntity>(user);
  }

  async remove(id: string) {
    const user = await this.db
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning();

    return queryOne<UserEntity>(user);
  }
}
