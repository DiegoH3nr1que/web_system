'use client';
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  username: string;
}

interface AuthContextProps {
  user: User | null | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined); // Undefined significa "ainda carregando"
  const [authToken, setAuthToken] = useState<string | null | undefined>(undefined);
  const router = useRouter();

  // Restaurar token e usuário ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setAuthToken(token);
      setUser(JSON.parse(storedUser));
    } else {
      setAuthToken(null);
      setUser(null);
    }
  }, []);

  // Função para fazer login
  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await axios.post("http://localhost:8000/auth/token", new URLSearchParams({
          username,
          password,
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const { access_token } = response.data;
        if (!access_token) {
          throw new Error("Token não recebido.");
        }

        // Salvar token e usuário localmente
        setAuthToken(access_token);
        localStorage.setItem("authToken", access_token);
        setUser({ username });
        localStorage.setItem("user", JSON.stringify({ username }));

        // Redirecionar para o dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Login falhou. Verifique suas credenciais.");
      }
    },
    [router]
  );

  // Função para fazer logout
  const logout = useCallback(() => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    router.push("/"); // Redirecionar para a página inicial
  }, [router]);

  const isAuthenticated = authToken !== null && authToken !== undefined;

  return (
    <AuthContext.Provider value={{ user , login, logout, isAuthenticated }}>
      {authToken === undefined || user === undefined ? null : children} {/* Exibir children apenas após inicializar */}
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
