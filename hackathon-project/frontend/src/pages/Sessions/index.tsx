import { useState } from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';

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

const AddButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SessionCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SessionDate = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const SessionTime = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const SessionNotes = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  line-height: 1.5;
`;

interface Session {
  id: number;
  date: string;
  time: string;
  notes: string;
}

export function Sessions() {
  const { patientName } = useParams<{ patientName: string }>();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([
    { id: 1, date: '15/03/2024', time: '14:00', notes: 'Paciente relatou melhora significativa nos sintomas de ansiedade.' },
    { id: 2, date: '08/03/2024', time: '14:00', notes: 'Sessão focada em técnicas de respiração e mindfulness.' },
  ]);

  const handleAddSession = () => {
    navigate(`/transcription/${encodeURIComponent(patientName || '')}`);
  };

  return (
    <Container>
      <Header>
        <Title>Sessões - {patientName}</Title>
        <AddButton onClick={handleAddSession}>
          <FiPlus />
          Nova Sessão
        </AddButton>
      </Header>

      <SessionsGrid>
        {sessions.map(session => (
          <SessionCard key={session.id}>
            <SessionDate>{session.date}</SessionDate>
            <SessionTime>{session.time}</SessionTime>
            <SessionNotes>{session.notes}</SessionNotes>
          </SessionCard>
        ))}
      </SessionsGrid>
    </Container>
  );
} 