import { useState } from 'react';
import styled from 'styled-components';
import { FaMicrophone } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
`;

const TranscriptionForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const MicrophoneButton = styled(Button)`
  background: ${props => props.theme.colors.secondary};
`;

export function Transcription() {
  const { patientName } = useParams<{ patientName: string }>();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de salvamento
    console.log({ date, time, transcription });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implementar lógica de gravação
  };

  return (
    <Container>
      <Header>
        <Title>Transcrição de Consulta - {patientName}</Title>
      </Header>

      <TranscriptionForm onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Data da Consulta</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Horário</Label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Transcrição</Label>
          <TextArea
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            placeholder="Digite ou grave a transcrição da consulta..."
            required
          />
        </InputGroup>

        <ButtonGroup>
          <Button type="submit">Salvar Transcrição</Button>
          <MicrophoneButton type="button" onClick={toggleRecording}>
            <FaMicrophone />
            {isRecording ? 'Parar Gravação' : 'Iniciar Gravação'}
          </MicrophoneButton>
        </ButtonGroup>
      </TranscriptionForm>
    </Container>
  );
} 