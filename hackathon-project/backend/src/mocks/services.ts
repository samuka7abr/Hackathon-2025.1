import { User, Patient, Session } from '../types/database';
import { mockUsers } from './users';
import { mockPatients } from './patients';
import { mockSessions } from './sessions';

// Serviço de autenticação
export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }
    return {
      user,
      token: 'mock-jwt-token'
    };
  },

  register: async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
    const newUser = {
      ...userData,
      id: mockUsers.length + 1,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockUsers.push(newUser);
    return newUser;
  }
};

// Serviço de pacientes
export const patientService = {
  getPatients: async (psychologistId: number): Promise<Patient[]> => {
    return mockPatients.filter(p => p.psychologist_id === psychologistId);
  },

  getPatient: async (id: number): Promise<Patient | undefined> => {
    return mockPatients.find(p => p.id === id);
  },

  createPatient: async (patientData: Omit<Patient, 'id' | 'created_at' | 'updated_at'>): Promise<Patient> => {
    const newPatient = {
      ...patientData,
      id: mockPatients.length + 1,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockPatients.push(newPatient);
    return newPatient;
  },

  updatePatient: async (id: number, patientData: Partial<Patient>): Promise<Patient> => {
    const index = mockPatients.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Paciente não encontrado');
    }
    mockPatients[index] = {
      ...mockPatients[index],
      ...patientData,
      updated_at: new Date()
    };
    return mockPatients[index];
  },

  deletePatient: async (id: number): Promise<void> => {
    const index = mockPatients.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Paciente não encontrado');
    }
    mockPatients.splice(index, 1);
  }
};

// Serviço de sessões
export const sessionService = {
  getSessions: async (patientId: number): Promise<Session[]> => {
    return mockSessions.filter(s => s.patient_id === patientId);
  },

  getSession: async (id: number): Promise<Session | undefined> => {
    return mockSessions.find(s => s.id === id);
  },

  createSession: async (sessionData: Omit<Session, 'id' | 'created_at' | 'updated_at'>): Promise<Session> => {
    const newSession = {
      ...sessionData,
      id: mockSessions.length + 1,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockSessions.push(newSession);
    return newSession;
  },

  updateSession: async (id: number, sessionData: Partial<Session>): Promise<Session> => {
    const index = mockSessions.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Sessão não encontrada');
    }
    mockSessions[index] = {
      ...mockSessions[index],
      ...sessionData,
      updated_at: new Date()
    };
    return mockSessions[index];
  },

  deleteSession: async (id: number): Promise<void> => {
    const index = mockSessions.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Sessão não encontrada');
    }
    mockSessions.splice(index, 1);
  }
}; 