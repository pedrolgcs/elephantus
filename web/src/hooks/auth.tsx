import React, { useCallback, useState, createContext, useContext } from 'react';
import jwt from 'jsonwebtoken';

// services
import api from '../services/api';

interface User {
  id: string;
  avatarUrl?: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string;
  user: User;
}

// signIn data interface
interface SignInCredentials {
  email: string;
  password: string;
}

// return interface methods
interface AuthContextData {
  user: User;
  signIn(data: SignInCredentials): Promise<void>;
  signOut(): void;
}

// create context
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// provider, around the all application
const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Elephantus:token');
    const user = localStorage.getItem('@Elephantus:user');

    if (token && user) {
      const { exp }: any = jwt.decode(token);

      if (Date.now() < exp * 1000) {
        return { token, user: JSON.parse(user) };
      }
      localStorage.removeItem('@Elephantus:storage');
      localStorage.removeItem('@Elephantus:storage');
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', { email, password });
    const { token, user } = response.data;

    localStorage.setItem('@Elephantus:token', token);
    localStorage.setItem('@Elephantus:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Elephantus:storage');
    localStorage.removeItem('@Elephantus:storage');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an Auth provider');
  }

  return context;
}

export { AuthProvider, useAuth };
