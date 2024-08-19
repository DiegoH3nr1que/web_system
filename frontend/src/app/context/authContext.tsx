'use client';
import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  username: string;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Função de login
  const login = useCallback((username: string, password: string) => {
    if (username === "admin" && password === "password") {
      setUser({ username });
      router.push("/dashboard");
    } else {
      console.error("Login failed: incorrect username or password");
    }
  }, [router]);

  // Função de logout
  const logout = useCallback(() => {
    setUser(null); // Atualiza o estado do usuário
    router.push("/"); // Navega para a página inicial
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
