import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('A variável de ambiente DATABASE_URL não foi definida.');
}

export default defineConfig({
  schema: './src/db/schema.ts', 
  out: './src/db/migrations',
  dialect: 'postgresql',   
  dbCredentials: {
    url: process.env.DATABASE_URL, 
  },
});