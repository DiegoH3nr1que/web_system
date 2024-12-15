"use client";
import { useState, useEffect } from "react";
import { Aside } from "@/app/components/aside";
import { Footer } from "@/app/components/footer";
import { FaEdit, FaTrash, FaEllipsisH } from "react-icons/fa";
import Table from "@/app/components/table";
import { CustomDialog } from "@/app/components/machine_dialog";
import ProtectedRoute from "@/app/components/protectedRouter";
import { RealTimeClock } from "@/app/components/realTimeClock";
import ImageUpload from "@/app/components/upload_image";
import api from "@/services/axiosInstance";

// Interface para máquina
interface Machine {
  id: number;
  name: string;
  type: string;
  model: string;
  serial_number: string;
  location: string;
  manufacture_date: string;
  image?: string; // URL ou base64 da imagem
}

// Funções para comunicação com o backend
const fetchMachines = async (): Promise<Machine[]> => {
  try {
    const response = await api.get("/inventory/machines");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar máquinas:", error);
    throw error;
  }
};

const getMachineByID = async (id: number): Promise<Machine> => {
  try {
    const response = await api.get(`/inventory/machines/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes da máquina:", error);
    throw error;
  }
};

const createMachine = async (formData: FormData): Promise<Machine> => {
  try {
    const response = await api.post("/inventory/machines", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar máquina:", error);
    throw error;
  }
};

const deleteMachine = async (id: number): Promise<void> => {
  try {
    await api.delete(`/inventory/machines/${id}`);
  } catch (error) {
    console.error("Erro ao deletar máquina:", error);
    throw error;
  }
};

export default function MaquinasPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  // Buscar máquinas na inicialização
  useEffect(() => {
    const getMachines = async () => {
      try {
        const data = await fetchMachines();
        setMachines(data);
      } catch (error) {
        console.error("Erro ao carregar máquinas:", error);
      }
    };

    getMachines();
  }, []);

  // Submissão de nova máquina
  const handleSubmit = async (data: Omit<Machine, "id">) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("model", data.model);
      formData.append("serial_number", data.serial_number);
      formData.append("location", data.location);
      formData.append("manufacture_date", data.manufacture_date);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const newMachine = await createMachine(formData);
      setMachines((prev) => [...prev, newMachine]);
      alert("Máquina cadastrada com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar máquina. Verifique os dados e tente novamente.");
    }
  };

  // Deletar uma máquina
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja deletar esta máquina? Esta ação não pode ser desfeita."
    );
    if (confirmDelete) {
      try {
        await deleteMachine(id);
        setMachines((prev) => prev.filter((machine) => machine.id !== id));
        alert("Máquina deletada com sucesso!");
      } catch (error) {
        alert("Erro ao deletar máquina. Tente novamente mais tarde.");
      }
    }
  };

  // Obter detalhes de uma máquina
  const handleGetByID = async (id: number) => {
    try {
      const machineDetails = await getMachineByID(id);
      setSelectedMachine(machineDetails); // Atualiza os detalhes da máquina selecionada
    } catch (error) {
      alert(
        "Erro ao carregar detalhes da máquina. Tente novamente mais tarde."
      );
    }
  };

  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "Tipo", accessor: "type" },
    { header: "Modelo", accessor: "model" },
    { header: "Data Fabricação", accessor: "manufacture_date" },
    { header: "Número de Série", accessor: "serial_number" },
    { header: "Localização", accessor: "location" },
  ];

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col overflow-y-auto scroll-invisivel relative">
        <div className="flex-1 flex">
          <Aside />
          <main className="flex-1 flex flex-col p-6 bg-background">
            <header className="text-left p-4 rounded-md mb-6 flex justify-between">
              <h1 className="text-4xl font-bold uppercase text-foreground">
                Máquinas
              </h1>
              <RealTimeClock />
            </header>

            <div className="flex-1">
              <div className="container mx-auto p-4 bg-background rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold text-foreground">
                    Lista de Máquinas
                  </h1>
                  <CustomDialog
                    triggerLabel="Cadastrar Máquina"
                    title="Cadastrar Máquina"
                    description="Preencha os dados abaixo para cadastrar uma nova máquina."
                    TypeButton="Salvar"
                    fields={[
                      {
                        id: "name",
                        label: "Nome",
                        type: "text",
                        required: true,
                      },
                      {
                        id: "type",
                        label: "Tipo",
                        type: "text",
                        required: true,
                      },
                      {
                        id: "model",
                        label: "Modelo",
                        type: "text",
                        required: true,
                      },
                      {
                        id: "serial_number",
                        label: "Número de Série",
                        type: "text",
                        required: true,
                      },
                      {
                        id: "location",
                        label: "Localização",
                        type: "text",
                        required: true,
                      },
                      {
                        id: "manufacture_date",
                        label: "Data Fabricação",
                        type: "date",
                        required: true,
                      },
                    ]}
                    extraContent={
                      <ImageUpload
                        onImageUpload={(file) => setSelectedImage(file)}
                      />
                    }
                    onSubmit={handleSubmit}
                  />
                </div>

                <div className="max-h-96 overflow-y-auto">
                  <Table
                    columns={columns}
                    data={machines}
                    actions={(item) => (
                      <div className="flex space-x-2">
                        <FaTrash
                          className="cursor-pointer text-red-500"
                          onClick={() => handleDelete(item.id)}
                        />
                        <FaEllipsisH
                          className="cursor-pointer text-gray-500"
                          onClick={() => handleGetByID(item.id)}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Mostrar detalhes da máquina */}
              {selectedMachine && (
                <div className="mt-4 p-4 bg-foreground rounded-lg shadow relative text-background">
                  {/* Botão de fechamento */}
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-background"
                    onClick={() => setSelectedMachine(null)}
                  >
                    ✖
                  </button>
                  <h2 className="text-2xl font-bold mb-2">
                    Detalhes da Máquina
                  </h2>
                  <p>
                    <strong>Nome:</strong> {selectedMachine.name}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {selectedMachine.type}
                  </p>
                  <p>
                    <strong>Modelo:</strong> {selectedMachine.model}
                  </p>
                  <p>
                    <strong>Número de Série:</strong>{" "}
                    {selectedMachine.serial_number}
                  </p>
                  <p>
                    <strong>Localização:</strong> {selectedMachine.location}
                  </p>
                  <p>
                    <strong>Data de Fabricação:</strong>{" "}
                    {selectedMachine.manufacture_date}
                  </p>
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
