"use client"

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';

interface AuthContextModel {
  loading: boolean
  customerId: string | null
  onLogin: (name: string) => void
}

export const AuthContext = createContext<AuthContextModel>(
  {} as AuthContextModel,
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter()

  const [customerId, setCustomerId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = useCallback(async (name: string) => {
    if (!name) return
    setLoading(true)

    try {
      const { id } = await authService.login(name)
      localStorage.setItem("customerId", id)
      setCustomerId(id)
      router.push("/home")
    } catch (error) {
      console.log("login error: ", error)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    const customerId = localStorage.getItem("customerId")
    if (customerId) {
      setCustomerId(customerId)
      router.push("/home")
    } else {
      router.push("/")
    }
  }, [router])

  const authContextValue: AuthContextModel = useMemo(() => ({
    loading,
    customerId,
    onLogin: handleLogin,
  }), [
    loading,
    customerId,
    handleLogin,
  ]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
