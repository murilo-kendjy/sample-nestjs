import { getTableColumns } from 'drizzle-orm';
import { users } from '../schema.js';

export const { password, ...userCols } = getTableColumns(users);
export type Users = typeof users;
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
