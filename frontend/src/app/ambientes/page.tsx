"use client";
import { useState, useEffect } from "react";
import api from "@/services/axiosInstance";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../components/table";
import { EnvironmentDialog } from "../components/environment_dialog";
import ProtectedRoute from "../components/protectedRouter";
import { RealTimeClock } from "../components/realTimeClock";

// Interface para os dados do ambiente
interface Environment {
  id: number;
  name: string;
  type: string;
  location: string;
  condition: string;
  maintenance_team?: string;
  maintenances_done: number;
}

export default function AmbientesPage() {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar ambientes do backend
  const fetchEnvironments = async () => {
    try {
      const response = await api.get<Environment[]>("/environments");
      setEnvironments(response.data);
    } catch (error) {
      console.error("Erro ao buscar ambientes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Criar um novo ambiente
  const createEnvironment = async (data: Omit<Environment, "id">) => {
    try {
      const response = await api.post<Environment>("/environments", data);
      setEnvironments((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao criar ambiente:", error);
    }
  };

  // Atualizar um ambiente existente
  const updateEnvironment = async (id: number, data: Partial<Environment>) => {
    try {
      const response = await api.put<Environment>(`/environments/${id}`, data);
      setEnvironments((prev) =>
        prev.map((env) => (env.id === id ? response.data : env))
      );
    } catch (error) {
      console.error("Erro ao atualizar ambiente:", error);
    }
  };

  // Deletar um ambiente
  const deleteEnvironment = async (id: number) => {
    try {
      await api.delete(`/environments/${id}`);
      setEnvironments((prev) => prev.filter((env) => env.id !== id));
    } catch (error) {
      console.error("Erro ao deletar ambiente:", error);
    }
  };

  useEffect(() => {
    fetchEnvironments();
  }, []);

  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "Tipo", accessor: "type" },
    { header: "Localização", accessor: "location" },
    { header: "Condição", accessor: "condition" },
    { header: "Equipe de Manutenção", accessor: "maintenance_team" },
    { header: "Manutenções Realizadas", accessor: "maintenances_done" },
  ];

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col overflow-y-auto scroll-invisivel relative">
        <div className="flex-1 flex">
          <Aside />
          <main className="flex-1 flex flex-col p-6 bg-background">
            <header className="text-left p-4 rounded-md mb-6 flex justify-between">
              <h1 className="text-4xl font-bold uppercase text-foreground">
                Ambientes
              </h1>
              <RealTimeClock />
            </header>

            <div className="flex-1">
              <div className="container mx-auto p-4 bg-background rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold text-foreground">
                    Lista de Ambientes cadastrados
                  </h1>
                  <EnvironmentDialog
                    triggerLabel="Cadastrar Ambiente"
                    title="Cadastrar Ambiente"
                    onSubmit={createEnvironment}
                  />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <Table<Environment>
                    columns={columns}
                    data={environments}
                    actions={(item) => (
                      <div className="flex space-x-2">
                        <EnvironmentDialog
                          triggerLabel={<FaEdit />}
                          title="Editar Ambiente"
                          environment={item}
                          onSubmit={(data) => updateEnvironment(item.id, data)}
                        />
                        <button
                          className="text-red-500"
                          onClick={() => deleteEnvironment(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
