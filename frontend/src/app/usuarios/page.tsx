"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../components/table";
import ProtectedRoute from "../components/protectedRouter";
import { RealTimeClock } from "../components/realTimeClock";
import { UserDialog } from "../components/user_dialog";
interface User {
  id: number;
  username: string;
  email:string;
  role: string;
}

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000", // URL base do backend
    timeout: 5000,
  });

  // Buscar usuários do backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users/");
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Lidar com a criação de novos usuários
  const handleCreateUser = async (userData: {
    username: string;
    password: string;
    email?: string;
    role: string;
  }) => {
    try {
      const response = await api.post("/users/register", userData);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (err: any) {
      alert(err.message || "Erro ao criar usuário.");
    }
  };

  // Lidar com a edição de usuários
  const handleEditUser = async (
    userId: number,
    updatedData: { username: string; role: string }
  ) => {
    try {
      const response = await api.put(`/users/${userId}`, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? response.data : user))
      );
    } catch (err: any) {
      alert(err.message || "Erro ao editar usuário.");
    }
  };

  // Lidar com a exclusão de usuários
  const handleDeleteUser = async (userId: number) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err: any) {
      alert(err.message || "Erro ao excluir usuário.");
    }
  };

  const columns = [
    { header: "Username", accessor: "username" },
    { header: "Role", accessor: "role" },
    { header: "Email", accessor: "email" },
  ];

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col overflow-y-auto scroll-invisivel relative">
        <div className="flex-1 flex">
          <Aside />
          <main className="flex-1 flex flex-col p-6 bg-background">
            <header className="text-left p-4 rounded-md mb-6 flex justify-between">
              <h1 className="text-4xl font-bold uppercase text-foreground">
                Usuários
              </h1>
              <RealTimeClock />
            </header>

            <div className="flex-1">
              <div className="container mx-auto p-4 bg-background rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold text-foreground">
                    Lista de usuários cadastrados
                  </h1>
                  <UserDialog
                    triggerLabel="Criar Usuário"
                    title="Criar Usuário"
                    onSubmit={handleCreateUser}
                  />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <p>Carregando usuários...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : (
                    <Table
                      columns={columns}
                      data={users}
                      actions={(item) => (
                        <div className="flex justify-center items-center gap-4">
                          <UserDialog
                            triggerLabel={
                              <FaEdit />
                            }
                            title="Editar Usuário"
                            user={{
                              username: item.username,
                              email: item.email,
                              role: item.role,
                            }}
                            onSubmit={(updatedData) =>
                              handleEditUser(item.id, updatedData)
                            }
                          />

                          <button
                            onClick={() => handleDeleteUser(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Excluir Usuário"
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
