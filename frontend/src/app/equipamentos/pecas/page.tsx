"use client";
import { useState, useEffect } from "react";
import { Aside } from "@/app/components/aside";
import { Footer } from "@/app/components/footer";
import {FaEdit, FaTrash, FaEllipsisH } from "react-icons/fa";
import { CustomPieChart } from "@/app/components/pieChart";
import Table from "@/app/components/table";
import { CustomDialog } from "@/app/components/parts_dialog";
import ProtectedRoute from "@/app/components/protectedRouter";
import { RealTimeClock } from "@/app/components/realTimeClock";
import api from "@/services/axiosInstance";

// Interface para peça
interface Part {
  id: number;
  name: string;
  code: string;
  current_stock: number;
  date_entry: string;
  entry_quantity: number;
  exit_quantity: number;
}

// Funções para comunicação com o backend
const fetchParts = async (): Promise<Part[]> => {
  try {
    const response = await api.get("/inventory/parts");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar peças:", error);
    throw error;
  }
};

const updatePart = async (id: number): Promise<Part> => {
  try {
    const response = await api.put(`/inventory/parts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes da peça:", error);
    throw error;
  }
};

const createPart = async (data: Omit<Part, "id">): Promise<Part> => {
  try {
    const response = await api.post("/inventory/parts", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar peça:", error);
    throw error;
  }
};

const deletePart = async (id: number): Promise<void> => {
  try {
    await api.delete(`/inventory/parts/${id}`);
  } catch (error) {
    console.error("Erro ao deletar peça:", error);
    throw error;
  }
};

export default function PartsPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  // Buscar peças na inicialização
  useEffect(() => {
    const getParts = async () => {
      try {
        const data = await fetchParts();
        setParts(data);
      } catch (error) {
        console.error("Erro ao carregar peças:", error);
      }
    };

    getParts();
  }, []);

  // Submissão de nova peça
  const handleSubmit = async (data: Omit<Part, "id">) => {
    try {
      const newPart = await createPart(data);
      setParts((prev) => [...prev, newPart]);
      alert("Peça cadastrada com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar peça. Verifique os dados e tente novamente.");
    }
  };

  // Deletar uma peça
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja deletar esta peça? Esta ação não pode ser desfeita."
    );
    if (confirmDelete) {
      try {
        await deletePart(id);
        setParts((prev) => prev.filter((part) => part.id !== id));
        alert("Peça deletada com sucesso!");
      } catch (error) {
        alert("Erro ao deletar peça. Tente novamente mais tarde.");
      }
    }
  };

  // Obter detalhes de uma peça
  const handleUpdate = async (id: number) => {
    try {
      const partDetails = await updatePart(id);
      setSelectedPart(partDetails); // Atualiza os detalhes da peça selecionada
    } catch (error) {
      alert("Erro ao carregar detalhes da peça. Tente novamente mais tarde.");
    }
  };

  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "Código", accessor: "code" },
    { header: "Quantidade", accessor: "current_stock" },
    { header: "Data de Entrada", accessor: "date_entry" },
    { header: "Entradas", accessor: "entry_quantity" },
    { header: "Saídas", accessor: "exit_quantity" },
  ];

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col overflow-y-auto scroll-invisivel relative">
        <div className="flex-1 flex">
          <Aside />
          <main className="flex-1 flex flex-col p-6 bg-background">
            <header className="text-left p-4 rounded-md mb-6 flex justify-between">
              <h1 className="text-4xl font-bold uppercase text-foreground">
                Peças
              </h1>
              <RealTimeClock />
            </header>

            <div className="flex-1">
              <div className="container mx-auto p-4 bg-background rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold text-foreground">
                    Lista de Peças
                  </h1>
                  <CustomDialog
                    triggerLabel="Cadastrar Peça"
                    title="Cadastrar Peça"
                    description="Preencha os dados abaixo para cadastrar uma nova peça."
                    TypeButton="Salvar"
                    fields={[
                      {
                        id: "name",
                        label: "Nome",
                        type: "text",
                        required: true,
                      },
                      {
                        id: "code",
                        label: "Código",
                        type: "text",
                        required: true,
                      },
                      {
                        id: "current_stock",
                        label: "Quantidade",
                        type: "number",
                        required: true,
                      },
                      {
                        id: "entry_quantity",
                        label: "Entradas",
                        type: "number",
                        required: true,
                      },
                      {
                        id: "exit_quantity",
                        label: "Saídas",
                        type: "number",
                        required: true,
                      },
                      {
                        id: "date_entry",
                        label: "Data de Entrada",
                        type: "date",
                        required: true,
                      },
                    ]}
                    onSubmit={handleSubmit}
                  />
                </div>

                <div className="max-h-96 overflow-y-auto">
                  <Table
                    columns={columns}
                    data={parts}
                    actions={(item) => (
                      <div className="flex space-x-2">
                        <FaTrash
                          className="cursor-pointer text-red-500"
                          onClick={() => handleDelete(item.id)}
                        />
                        <FaEllipsisH
                          className="cursor-pointer text-gray-500"
                          onClick={() => handleUpdate(item.id)}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-center my-6">
              <CustomPieChart
                data={parts.map((part) => ({
                  nome: part.name,
                  valor: part.current_stock,
                  fill: `hsl(var(--chart-${part.id % 5 + 1}))`,
                }))}
                dataKey="valor"
                nameKey="nome"
                title="Estoque de Peças"
                description="Mostrando o total de peças em estoque"
              />
            </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
