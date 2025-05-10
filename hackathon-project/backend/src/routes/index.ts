import { FastifyInstance } from 'fastify';
import { userService } from '../mocks/services';
import { patientService } from '../mocks/services';
import { sessionService } from '../mocks/services';

export async function routes(app: FastifyInstance) {
  // Rotas de Usuários
  app.get('/users', async () => {
    return userService.getUsers();
  });

  app.get('/users/:id', async (request) => {
    const { id } = request.params as { id: string };
    return userService.getUser(Number(id));
  });

  app.post('/users', async (request) => {
    return userService.createUser(request.body as any);
  });

  app.put('/users/:id', async (request) => {
    const { id } = request.params as { id: string };
    return userService.updateUser(Number(id), request.body as any);
  });

  app.delete('/users/:id', async (request) => {
    const { id } = request.params as { id: string };
    return userService.deleteUser(Number(id));
  });

  // Rotas de Pacientes
  app.get('/patients', async () => {
    return patientService.getPatients();
  });

  app.get('/patients/:id', async (request) => {
    const { id } = request.params as { id: string };
    return patientService.getPatient(Number(id));
  });

  app.post('/patients', async (request) => {
    return patientService.createPatient(request.body as any);
  });

  app.put('/patients/:id', async (request) => {
    const { id } = request.params as { id: string };
    return patientService.updatePatient(Number(id), request.body as any);
  });

  app.delete('/patients/:id', async (request) => {
    const { id } = request.params as { id: string };
    return patientService.deletePatient(Number(id));
  });

  // Rotas de Sessões
  app.get('/sessions', async () => {
    return sessionService.getSessions();
  });

  app.get('/sessions/:id', async (request) => {
    const { id } = request.params as { id: string };
    return sessionService.getSession(Number(id));
  });

  app.post('/sessions', async (request) => {
    return sessionService.createSession(request.body as any);
  });

  app.put('/sessions/:id', async (request) => {
    const { id } = request.params as { id: string };
    return sessionService.updateSession(Number(id), request.body as any);
  });

  app.delete('/sessions/:id', async (request) => {
    const { id } = request.params as { id: string };
    return sessionService.deleteSession(Number(id));
  });
} 