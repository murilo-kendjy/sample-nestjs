import { getTableColumns } from 'drizzle-orm';
import { roles } from '../schema.js';

export const roleCols = getTableColumns(roles);
export type Roles = typeof roles;
export type InsertRole = typeof roles.$inferInsert;
export type SelectRole = typeof roles.$inferSelect;
