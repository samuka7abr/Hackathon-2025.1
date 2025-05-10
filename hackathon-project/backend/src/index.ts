import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify();
fastify.register(cors);

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('🚀 Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

};

start();
