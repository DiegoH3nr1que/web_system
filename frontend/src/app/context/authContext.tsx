'use client';
import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  username: string;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await fetch("http://localhost:8000/auth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ username, password }),
        });

        if (!response.ok) {
          throw new Error("Login failed: invalid credentials");
        }

        const data = await response.json();
        setAuthToken(data.access_token);
        localStorage.setItem("authToken", data.access_token);
        setUser({ username });
        router.push("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check your username and password.");
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("authToken");
    router.push("/");
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
