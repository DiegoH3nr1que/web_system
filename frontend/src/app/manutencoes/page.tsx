"use client";
import { useState, useEffect } from "react";
import api from "@/services/axiosInstance";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import Table from "../components/table";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProtectedRoute from "../components/protectedRouter";
import { RealTimeClock } from "../components/realTimeClock";
import { MaintenanceDialog } from "../components/maintenance_dialog";

// Interface para os dados de manutenção
interface Maintenance {
  id: number;
  description: string;
  priority: string;
  status: string;
  requested_date: string;
  machine_id: number;
}

export default function ManutencaoPage() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar manutenções
  const fetchMaintenances = async () => {
    try {
      const response = await api.get<Maintenance[]>("/maintenances");
      setMaintenances(response.data);
    } catch (error) {
      console.error("Erro ao buscar manutenções:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma nova manutenção
  const createMaintenance = async (data: Omit<Maintenance, "id">) => {
    try {
      const response = await api.post<Maintenance>("/maintenances", data);
      setMaintenances((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao criar manutenção:", error);
    }
  };

  // Função para atualizar uma manutenção existente
  const updateMaintenance = async (id: number, data: Partial<Maintenance>) => {
    try {
      const response = await api.put<Maintenance>(`/maintenances/${id}`, data);
      setMaintenances((prev) =>
        prev.map((maint) => (maint.id === id ? response.data : maint))
      );
    } catch (error) {
      console.error("Erro ao atualizar manutenção:", error);
    }
  };

  // Função para deletar uma manutenção
  const deleteMaintenance = async (id: number) => {
    try {
      await api.delete(`/maintenances/${id}`);
      setMaintenances((prev) => prev.filter((maint) => maint.id !== id));
    } catch (error) {
      console.error("Erro ao deletar manutenção:", error);
    }
  };

  useEffect(() => {
    fetchMaintenances();
  }, []);

  // Colunas da tabela
  const columns = [
    { header: "Descrição", accessor: "description" },
    { header: "Prioridade", accessor: "priority" },
    { header: "Status", accessor: "status" },
    { header: "Data Solicitada", accessor: "requested_date" },
  ];

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col overflow-y-auto">
        <div className="flex-1 flex">
          <Aside />
          <main className="flex-1 flex flex-col p-6 bg-background">
            <header className="text-left p-4 rounded-md mb-6 flex justify-between">
              <h1 className="text-4xl font-bold uppercase text-foreground">
                Manutenções
              </h1>
              <RealTimeClock />
            </header>

            <div className="container mx-auto p-4 bg-background rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-foreground">
                  Lista de Manutenções
                </h1>
                <MaintenanceDialog
                  triggerLabel="Nova Manutenção"
                  title="Criar Manutenção"
                  onSubmit={createMaintenance}
                />
              </div>

              {loading ? (
                <div className="text-center">Carregando...</div>
              ) : maintenances.length === 0 ? (
                <div className="text-center text-gray-500">
                  Nenhuma manutenção cadastrada.
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  <Table<Maintenance>
                    columns={columns}
                    data={maintenances}
                    actions={(item) => (
                      <div className="flex space-x-2">
                        <MaintenanceDialog
                          triggerLabel={<FaEdit />}
                          title="Editar Manutenção"
                          maintenance={item}
                          onSubmit={(data) => updateMaintenance(item.id, data)}
                        />
                        <button
                          className="text-red-500"
                          onClick={() => deleteMaintenance(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
