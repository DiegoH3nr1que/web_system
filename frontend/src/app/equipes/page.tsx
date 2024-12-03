"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../components/table";
import ProtectedRoute from "../components/protectedRouter";
import { RealTimeClock } from "../components/realTimeClock";
import { TeamDialog } from "../components/team_dialog";

interface Team {
  id: number;
  team_name: string;
  technical_ids: number[];
  quant_maintenanc_realized: number;
  quant_maintenanc_finalized: number;
}

export default function UserPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000", // URL base do backend
    timeout: 5000,
  });

  // Buscar usuários do backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get("/teams/");
        setTeams(response.data);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar equipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Lidar com a criação de novos times
  const handleCreateTeam = async (teamData: {
    team_name: string;
    technical_ids: number[];
    quant_maintenanc_realized: number;
    quant_maintenanc_finalized: number;
  }) => {
    try {
      const response = await api.post("/teams/register", teamData);
      setTeams((prevTeams) => [...prevTeams, response.data]);
    } catch (err: any) {
      alert(err.message || "Erro ao criar equipe.");
    }
  };

  // Lidar com a edição de times
  const handleEditTeam = async (
    team_id: number,
    updatedData: {
      team_name: string;
      technical_ids: number[];
      quant_maintenanc_realized: number;
      quant_maintenanc_finalized: number;
    }
  ) => {
    try {
      const response = await api.put(`/teams/${team_id}`, updatedData);
      setTeams((prevTeams) =>
        prevTeams.map((team) => (team.id === team_id ? response.data : team))
      );
    } catch (err: any) {
      alert(err.message || "Erro ao editar equipe.");
    }
  };

  // Lidar com a exclusão de usuários
  const handleDeleteTeam = async (team_id: number) => {
    try {
      await api.delete(`/teams/${team_id}`);
      setTeams((prevTeams) => prevTeams.filter((team) => team.id !== team_id));
    } catch (err: any) {
      alert(err.message || "Erro ao excluir equipe.");
    }
  };

  const columns = [
    { header: "Id", accessor: "id" },
    { header: "Nome", accessor: "team_name" },
    { header: "Técnicos", accessor: "technical_names"},
    { header: "Manutenções à fazer", accessor: "quant_maintenanc_realized" },
    {
      header: "Manutenções finalizadas",
      accessor: "quant_maintenanc_finalized",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col overflow-y-auto scroll-invisivel relative">
        <div className="flex-1 flex">
          <Aside />
          <main className="flex-1 flex flex-col p-6 bg-background">
            <header className="text-left p-4 rounded-md mb-6 flex justify-between">
              <h1 className="text-4xl font-bold uppercase text-foreground">
                Equipes
              </h1>
              <RealTimeClock />
            </header>

            <div className="flex-1">
              <div className="container mx-auto p-4 bg-background rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold text-foreground">
                    Lista de equipes cadastradas
                  </h1>
                  <TeamDialog
                    triggerLabel="Criar Equipe"
                    title="Criar Equipe"
                    onSubmit={handleCreateTeam}
                  />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <p>Carregando equipes...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : (
                    <Table
                      columns={columns}
                      data={teams}
                      actions={(item) => (
                        <div className="flex justify-center items-center gap-4">
                          <TeamDialog
                            triggerLabel={<FaEdit />}
                            title="Editar Equipe"
                            onSubmit={(updatedData) =>
                              handleEditTeam(item.id, updatedData)
                            }
                          />
                          <button
                            onClick={() => handleDeleteTeam(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Excluir Equipe"
                          >
                            <FaTrash className="cursor-pointer" />
                          </button>
                        </div>
                      )}
                    />
                  )}
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
