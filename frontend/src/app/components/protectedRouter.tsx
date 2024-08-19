"use client";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode  } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redireciona para o login se o usuário não estiver autenticado
    }
  }, [user, router]);

  if (!user) return null; // Ou exiba uma tela de carregamento

  return <>{children}</>;
}
