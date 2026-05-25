// src/db/schema.ts
import { pgTable, uuid, text, varchar, timestamp, numeric, pgEnum } from 'drizzle-orm/pg-core';

// 1. STATUS DO FUNIL DE VENDAS (CRM)
// Definindo os status que uma proposta pode ter no sistema
export const statusEnum = pgEnum('status', [
  'prospect', 
  'negotiation', 
  'closed_won', 
  'closed_lost' 
]);

// 2. TABELA DE CLIENTES (CRM)
// Guarda os leads e contatos comerciais
export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  company: text('company'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. TABELA DE PROPOSTAS / NEGÓCIOS (CRM)
// Guarda os valores e o andamento das negociações
export const deals = pgTable('deals', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  value: numeric('value', { precision: 10, scale: 2 }).notNull(), 
  status: statusEnum('status').default('prospect').notNull(),
  closedAt: timestamp('closed_at'), 
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. TABELA DE TRANSAÇÕES (FINANCEIRO)
// Controla as contas a pagar e a receber (Fluxo de Caixa)
export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  dealId: uuid('deal_id').references(() => deals.id, { onDelete: 'set null' }), // Se veio do CRM, guarda a origem
  description: text('description').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  type: text('type').$type<'income' | 'expense'>().notNull(), 
  dueDate: timestamp('due_date').notNull(),
  status: text('status').$type<'pending' | 'paid' | 'overdue'>().default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});