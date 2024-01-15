import { createId } from '@paralleldrive/cuid2';
import { index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'user',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar('name', { length: 100 }).notNull(),
    password: varchar('password', { length: 100 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }),
    roleId: varchar('role_id', { length: 36 })
      .notNull()
      .references(() => roles.id),
  },
  (table) => {
    return {
      createdAtIdx: index('user_created_at_idx').on(table.createdAt),
    };
  },
);

export const roles = pgTable(
  'role',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar('name', { length: 100 }).unique().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }),
  },
  (table) => {
    return {
      createdAtIdx: index('role_created_at_idx').on(table.createdAt),
    };
  },
);
