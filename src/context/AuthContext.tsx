import { AxiosResponse } from 'axios';
import router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

type User = {
  id: string;
  enrolment: string;
  name: string;
  role: string;
};

type SignInRequest = {
  enrolment: string;
  password: string;
};

interface SignInResponse {
  authToken: string;
  user: User;
}

type AuthContextData = {
  signIn(credentials: SignInRequest): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
  user: User | undefined;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    async function getLoggedUser() {
      const { 'sysdoc.token': token } = parseCookies();

      if (token) {
        const response: AxiosResponse<User> = await api.get('/profile');
        const { id, enrolment, name, role } = response.data;
        setUser({ id, enrolment, name, role });
      }
    }

    getLoggedUser();
  }, []);

  async function signIn({ enrolment, password }: SignInRequest) {
    try {
      const response: AxiosResponse<SignInResponse> = await api.post('login', {
        enrolment,
        password
      });

      const { authToken, user } = response.data;

      setCookie(undefined, 'sysdoc.token', authToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
        sameSite: true
      });

      setUser(user);

      window.location.reload();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  function signOut() {
    destroyCookie(undefined, 'sysdoc.token');

    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
