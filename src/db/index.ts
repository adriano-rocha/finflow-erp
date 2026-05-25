// src/db/index.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL) {
  throw new Error('A variável de ambiente DATABASE_URL não foi definida.');
}

// Inicializa a conexão HTTP com o Neon
const sql = neon(process.env.DATABASE_URL);

// Exporta a instância do banco para usarmos nos nossos Server Actions
export const db = drizzle(sql);