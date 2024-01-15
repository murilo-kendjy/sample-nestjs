import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

export const DrizzleAsyncProvider = 'drizzleProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async () => {
      const connection = postgres(process.env.CONNECTION_STRING);
      const db = drizzle(connection, { schema });

      return db;
    },
    exports: [DrizzleAsyncProvider],
  },
];
