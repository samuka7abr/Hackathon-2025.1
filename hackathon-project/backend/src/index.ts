import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import connection from './config/database';

// Carrega as variáveis de ambiente
dotenv.config();

const fastify = Fastify({
  logger: true
});

// Registra o CORS
fastify.register(cors, {
  origin: true
});

// Rota de teste
fastify.get('/', async (request, reply) => {
  return { status: 'API is running' };
});

// Rota de teste do banco de dados
fastify.get('/test-db', async (request, reply) => {
  try {
    const result = await connection.raw('SELECT NOW()');
    return { 
      status: 'Database connection successful',
      timestamp: result.rows[0].now
    };
  } catch (error: any) {
    fastify.log.error(error);
    reply.status(500).send({ 
      error: 'Database connection failed',
      message: error.message 
    });
  }
});

const start = async () => {
  try {
    // Testa a conexão com o banco de dados
    await connection.raw('SELECT 1');
    console.log('✅ Database connection successful');

    // Inicia o servidor
    await fastify.listen({ 
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0'
    });
    console.log(`🚀 Server listening on http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

start();
