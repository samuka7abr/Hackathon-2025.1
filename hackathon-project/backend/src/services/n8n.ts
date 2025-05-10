import axios from 'axios';
import FormData from 'form-data';

const N8N_BASE_URL = process.env.N8N_BASE_URL || 'http://localhost:5678';
const N8N_WEBHOOK_PATH = process.env.N8N_WEBHOOK_PATH || '/webhook/consulta';

export const n8nService = {
  async transcribeAudio(audioBuffer: Buffer): Promise<string> {
    try {
      // Cria um novo FormData
      const formData = new FormData();
      formData.append('audio', audioBuffer, {
        filename: 'audio.mp3',
        contentType: 'audio/mpeg'
      });

      const response = await axios.post(
        `${N8N_BASE_URL}${N8N_WEBHOOK_PATH}`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      // O N8N retornará a transcrição no corpo da resposta
      return response.data.transcription;
    } catch (error) {
      console.error('Erro ao enviar áudio para o N8N:', error);
      if (axios.isAxiosError(error)) {
        console.error('Detalhes da resposta:', error.response?.data);
      }
      throw new Error('Falha ao transcrever áudio');
    }
  }
}; 