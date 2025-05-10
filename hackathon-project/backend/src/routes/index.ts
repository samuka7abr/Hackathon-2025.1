import { FastifyInstance } from 'fastify';
import { userService } from '../mocks/services';
import { patientService } from '../mocks/services';
import { sessionService } from '../mocks/services';
import multipart from '@fastify/multipart';
import { minioService } from '../services/minio';

export async function routes(app: FastifyInstance) {
  // Inicializa o MinIO
  await minioService.initialize();

  // Registra o plugin multipart para upload de arquivos
  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });

  // Rota para upload de áudio
  app.post('/sessions/:id/audio', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const data = await request.file();
      
      if (!data) {
        return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
      }

      if (!data.filename.endsWith('.mp3') && !data.filename.endsWith('.wav')) {
        return reply.status(400).send({ error: 'Formato de arquivo não suportado. Use .mp3 ou .wav' });
      }

      // Faz upload para o MinIO
      const audioUrl = await minioService.uploadAudio(id, data.file, data.filename);

      // Por enquanto, vamos apenas simular uma transcrição
      const mockTranscription = "Esta é uma transcrição simulada do áudio.";
      
      // Atualiza a sessão com a transcrição e URL do áudio
      const updatedSession = await sessionService.updateSession(Number(id), {
        transcription: mockTranscription,
        status: 'completed',
        audioUrl
      });

      return updatedSession;
    } catch (error) {
      console.error('Erro detalhado:', error);
      return reply.status(500).send({ 
        error: 'Erro ao processar o upload',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  });

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