'use server' 

import { db } from '../../db';
import { customers } from '../../db/schema';

// Interface simples para o TypeScript saber o que precisamos enviar
interface CreateCustomerInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

export async function createCustomerAction(data: CreateCustomerInput) {
  try {
    // Insere o cliente no banco de dados usando o Drizzle
    const [newCustomer] = await db.insert(customers).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
    }).returning(); // O returning() faz o banco nos devolver o cliente com o ID criado

    console.log('🚀 Cliente criado com sucesso no banco:', newCustomer);
    
    return { success: true, customer: newCustomer };
  } catch (error) {
    console.error('❌ Erro ao criar cliente:', error);
    return { success: false, error: 'Não foi possível salvar o cliente.' };
  }
}