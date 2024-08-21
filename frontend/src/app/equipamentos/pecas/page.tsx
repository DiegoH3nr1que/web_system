"use client";
import { Aside } from "@/app/components/aside";
import { Footer } from "@/app/components/footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "@/app/components/table";
import { CustomDialog } from "@/app/components/dialog";
import ProtectedRoute from "@/app/components/protectedRouter";
import { RealTimeClock } from "@/app/components/realTimeClock";

export default function maquinasPage() {
  const columns = [
    { header: "Nome", accessor: "nome" },
    { header: "Tipo", accessor: "tipo" },
    { header: "Modelo", accessor: "modelo" },
    { header: "Data fabricação", accessor: "data_fabricacao" },
    {
      header: "Número Série",
      accessor: "num_serie",
    },
    { header: "Localização ", accessor: "localizacao" },
  ];

  const data = [
    {
      nome: "Máquina X",
      tipo: "Industrial",
      modelo: 2024,
      data_fabricacao: "03/01/2024",
      num_serie: "SN123456789",
      localizacao: "Fábrica 1 - Setor B",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      nome: "Máquina X",
      tipo: "Industrial",
      modelo: 2024,
      data_fabricacao: "03/01/2024",
      num_serie: "SN123456789",
      localizacao: "Fábrica 1 - Setor B",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      nome: "Máquina X",
      tipo: "Industrial",
      modelo: 2024,
      data_fabricacao: "03/01/2024",
      num_serie: "SN123456789",
      localizacao: "Fábrica 1 - Setor B",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      nome: "Máquina X",
      tipo: "Industrial",
      modelo: 2024,
      data_fabricacao: "03/01/2024",
      num_serie: "SN123456789",
      localizacao: "Fábrica 1 - Setor B",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      nome: "Máquina X",
      tipo: "Industrial",
      modelo: 2024,
      data_fabricacao: "03/01/2024",
      num_serie: "SN123456789",
      localizacao: "Fábrica 1 - Setor B",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      nome: "Máquina X",
      tipo: "Industrial",
      modelo: 2024,
      data_fabricacao: "03/01/2024",
      num_serie: "SN123456789",
      localizacao: "Fábrica 1 - Setor B",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      nome: "Máquina X",
      tipo: "Industrial",
      modelo: 2024,
      data_fabricacao: "03/01/2024",
      num_serie: "SN123456789",
      localizacao: "Fábrica 1 - Setor B",
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
  ];


  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col">
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
                    Lista de Peças cadastradas
                  </h1>
                  <CustomDialog
                    triggerLabel="Cadastrar Peças"
                    title="Cadastrar Peças"
                    TypeButton="Cadastrar"
                    description="Insira todos os campos corretamente!"
                    fields={[
                      { id: "nome", label: "Nome", type: "text" },
                      {
                        id: "tipo",
                        label: "Tipo",
                        type: "Text",
                      },
                      {
                        id: "modelo",
                        label: "Modelo",
                        type: "number",
                      },
                      {
                        id: "data_fabricacao",
                        label: "Data fabricação",
                        type: "Date",
                      },
                      {
                        id: "num_serie",
                        label: "Número de Série",
                        type: "Date",
                      },
                      {
                        id: "localizacao",
                        label: "Localização",
                        type: "Date",
                      },
                    ]}
                  />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <Table
                    columns={columns}
                    data={data}
                    actions={(item) => (
                      <div className="flex space-x-2">
                        <CustomDialog
                          triggerLabel={<FaEdit />}
                          title="Editar Peças"
                          TypeButton="Editar"
                          description="Insira todos os campos corretamente!"
                          fields={[
                            { id: "nome", label: "Nome", type: "text" },
                            {
                              id: "tipo",
                              label: "Tipo",
                              type: "Text",
                            },
                            {
                              id: "modelo",
                              label: "Modelo",
                              type: "number",
                            },
                            {
                              id: "data_fabricacao",
                              label: "Data fabricação",
                              type: "Date",
                            },
                            {
                              id: "num_serie",
                              label: "Número de Série",
                              type: "number",
                            },
                            {
                              id: "localizacao",
                              label: "Localização",
                              type: "text",
                            },
                          ]}
                        />{" "}
                        <CustomDialog
                          triggerLabel={<FaTrash />}
                          title="Deletar Peça "
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
