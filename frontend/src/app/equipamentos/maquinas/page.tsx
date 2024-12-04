"use client";
import { useState } from "react";
import { Aside } from "@/app/components/aside";
import { Footer } from "@/app/components/footer";
import { FaEdit, FaTrash, FaEllipsisH } from "react-icons/fa";
import Table from "@/app/components/table";
import { CustomDialog } from "@/app/components/dialog";
import ProtectedRoute from "@/app/components/protectedRouter";
import { RealTimeClock } from "@/app/components/realTimeClock";
import ImageUpload from "@/app/components/upload_image";
import Image from "next/image";

export default function MaquinasPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<any>(null);

  const handleImageUpload = (file: File | null) => {
    setSelectedImage(file);
  };

  const columns = [
    { header: "Nome", accessor: "nome" },
    { header: "Tipo", accessor: "tipo" },
    { header: "Modelo", accessor: "modelo" },
    { header: "Data fabricação", accessor: "data_fabricacao" },
    { header: "Número Série", accessor: "num_serie" },
    { header: "Localização", accessor: "localizacao" },
    { header: "", accessor: "info" },
  ];

  const data: Record<string, any>[] = [];

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
                    Lista de Máquinas cadastradas
                  </h1>
                  <CustomDialog
                    triggerLabel="Cadastrar Máquinas"
                    title="Cadastrar Máquinas"
                    TypeButton="Cadastrar"
                    description="Insira todos os campos corretamente!"
                    fields={[
                      { id: "nome", label: "Nome", type: "text" },
                      { id: "tipo", label: "Tipo", type: "Text" },
                      { id: "modelo", label: "Modelo", type: "number" },
                      {
                        id: "data_fabricacao",
                        label: "Data fabricação",
                        type: "Date",
                      },
                      {
                        id: "num_serie",
                        label: "Número de Série",
                        type: "text",
                      },
                      { id: "localizacao", label: "Localização", type: "text" },
                    ]}
                    extraContent={
                      <ImageUpload onImageUpload={handleImageUpload} />
                    }
                  />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <Table
                    columns={columns}
                    data={data}
                    actions={(item) => (
                      <div className="flex space-x-2">
                        <CustomDialog
                          triggerLabel={<FaEllipsisH className="cursor-pointer" />}
                          title="Detalhes da Máquina"
                          description="Informações detalhadas da máquina selecionada"
                          TypeButton="Fechar"
                          fields={[]}
                          extraContent={
                            <div className="flex flex-col items-center">  {selectedImage && (
                                <Image
                                  src={
                                    selectedImage
                                      ? URL.createObjectURL(selectedImage)
                                      : ""
                                  }
                                  alt="Imagem da Máquina"
                                  className="w-48 h-48 object-cover mb-4"
                                />
                              )}
                              <p>
                                <strong>Nome:</strong> {item.nome}
                              </p>
                              <p>
                                <strong>Tipo:</strong> {item.tipo}
                              </p>
                              <p>
                                <strong>Modelo:</strong> {item.modelo}
                              </p>
                              <p>
                                <strong>Data de Fabricação:</strong>{" "}
                                {item.data_fabricacao}
                              </p>
                              <p>
                                <strong>Número de Série:</strong> {item.num_serie}
                              </p>
                              <p>
                                <strong>Localização:</strong> {item.localizacao}
                              </p>
                            </div>
                          }
                        />
                        <CustomDialog
                          triggerLabel={<FaEdit />}
                          title="Editar Máquinas"
                          TypeButton="Editar"
                          description="Insira todos os campos corretamente!"
                          fields={[
                            { id: "nome", label: "Nome", type: "text" },
                            { id: "tipo", label: "Tipo", type: "Text" },
                            { id: "modelo", label: "Modelo", type: "number" },
                            {
                              id: "data_fabricacao",
                              label: "Data fabricação",
                              type: "Date",
                            },
                            {
                              id: "num_serie",
                              label: "Número de Série",
                              type: "int",
                            },
                            {
                              id: "localizacao",
                              label: "Localização",
                              type: "text",
                            },
                          ]}
                        />
                        <CustomDialog
                          triggerLabel={<FaTrash />}
                          title="Deletar Máquina"
                          TypeButton="Deletar"
                          description=""
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
