import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider.js';
import * as schema from '../../drizzle/schema.js';
import { userCols } from '../../drizzle/utils/users.drizzle.js';
import { queryOne } from '../../utils/query.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserNoPassEntity } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.db
      .insert(schema.users)
      .values(createUserDto)
      .returning(userCols);

    return queryOne<UserNoPassEntity>(user);
  }

  async findAll() {
    return await this.db.select(userCols).from(schema.users).limit(500);
  }

  async findOne(id: string) {
    const user = await this.db
      .select(userCols)
      .from(schema.users)
      .where(eq(schema.users.id, id));

    return queryOne<UserNoPassEntity>(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.db
      .update(schema.users)
      .set(updateUserDto)
      .where(eq(schema.users.id, id))
      .returning(userCols);

    return queryOne<UserNoPassEntity>(user);
  }

  async remove(id: string) {
    const user = await this.db
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning(userCols);

    return queryOne<UserNoPassEntity>(user);
  }
}
