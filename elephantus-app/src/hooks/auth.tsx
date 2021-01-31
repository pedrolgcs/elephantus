import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  phone: string;
  city: string;
}

interface SignInCredencials {
  cpf: string;
}

interface AuthState {
  user: User;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const user = await AsyncStorage.getItem('@Elephantus:user');

      if (user) {
        setData({ user: JSON.parse(user) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ cpf }) => {
    const response = await api.get(`/responsible/auth/${cpf}`);

    await AsyncStorage.setItem(
      '@Elephantus:user',
      JSON.stringify(response.data),
    );

    setData({
      user: response.data,
    });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@Elephantus:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
