import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
  out: './drizzle',
  verbose: true,
  strict: true,
});
