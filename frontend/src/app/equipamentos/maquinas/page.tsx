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

// Funções para comunicação com o backend
const fetchMachines = async () => {
  try {
    const response = await api.get("/machines");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar máquinas:", error);
    throw error;
  }
};

const createMachine = async (formData) => {
  try {
    const response = await api.post("/machines", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar máquina:", error);
    throw error;
  }
};
const deleteMachine = async (id) => {
  try {
    const response = await api.delete(`/machines/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar máquina:", error);
    throw error;
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Tem certeza de que deseja deletar esta máquina? Esta ação não pode ser desfeita."
  );
  if (confirmDelete) {
    try {
      const result = await deleteMachine(id); // Requisição ao backend
      setMachines((prev) => prev.filter((machine) => machine.id !== id)); // Atualizar lista local
      alert(result.detail); // Mensagem do backend
    } catch (error) {
      alert("Erro ao deletar máquina. Tente novamente mais tarde.");
    }
  }
};


export default function MaquinasPage() {
  const [machines, setMachines] = useState([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
  const handleSubmit = async (data) => {
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
      setMachines((prev) => [...prev, newMachine]); // Atualiza a lista
      alert("Máquina cadastrada com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar máquina. Verifique os dados e tente novamente.");
    }
  };

  // Deletar uma máquina
  const handleDelete = async (id) => {
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
                      { id: "name", label: "Nome", type: "text", required: true },
                      { id: "type", label: "Tipo", type: "text", required: true },
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
                          onClick={() => alert("Detalhes da máquina")}
                        />
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
