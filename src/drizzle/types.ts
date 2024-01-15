import { users } from './schema.js';

export type Users = typeof users;
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
