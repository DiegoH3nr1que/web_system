"use client";
import { Aside } from "@/app/components/aside";
import { Footer } from "@/app/components/footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "@/app/components/table";
import { CustomDialog } from "@/app/components/dialog";
import ProtectedRoute from "@/app/components/protectedRouter";
import { RealTimeClock } from "@/app/components/realTimeClock";
import { PecasEstoquePieChart } from "@/app/components/pieChart";

export default function PecasPage() {
  const columns = [
    { header: "Nome", accessor: "nome" },
    { header: "Entradas", accessor: "entrada" },
    { header: "Saídas", accessor: "saida" },
    { header: "Data", accessor: "data" },
    { header: "Quantidade", accessor: "quantidade" },
    { header: "Estoque", accessor: "estoque" },
  ];

  const data = [
    {
      nome: "Peça X",
      entrada: 10,
      saida: 2,
      data: "03/01/2024",
      quantidade: 8,
      estoque: 50,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
    },
    {
      nome: "Peça Y",
      entrada: 20,
      saida: 5,
      data: "04/01/2024",
      quantidade: 15,
      estoque: 100,
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
                      { id: "codigo", label: "Código", type: "text" },
                      { id: "fornecedor", label: "Fornecedor", type: "text" },
                      { id: "entrada", label: "Entradas", type: "number" },
                      { id: "saida", label: "Saídas", type: "number" },
                      { id: "data", label: "Data", type: "date" },
                      { id: "quantidade", label: "Quantidade", type: "number" },
                      { id: "estoque", label: "Estoque", type: "number" },
                      {
                        id: "valor_unitario",
                        label: "Valor Unitário",
                        type: "number",
                      },
                      { id: "imagem", label: "Upload de Imagem", type: "file" },
                    ]}
                  />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <Table
                    columns={columns}
                    data={data.map((item) => ({
                      ...item,
                      editar: (
                        <CustomDialog
                          triggerLabel={<FaEdit />}
                          title="Editar Peças"
                          TypeButton="Editar"
                          description="Insira todos os campos corretamente!"
                          fields={[
                            { id: "nome", label: "Nome", type: "text" },
                            { id: "codigo", label: "Código", type: "text" },
                            {
                              id: "fornecedor",
                              label: "Fornecedor",
                              type: "text",
                            },
                            {
                              id: "entrada",
                              label: "Entradas",
                              type: "number",
                            },
                            { id: "saida", label: "Saídas", type: "number" },
                            { id: "data", label: "Data", type: "date" },
                            {
                              id: "quantidade",
                              label: "Quantidade",
                              type: "number",
                            },
                            { id: "estoque", label: "Estoque", type: "number" },
                            {
                              id: "valor_unitario",
                              label: "Valor Unitário",
                              type: "number",
                            },
                            {
                              id: "imagem",
                              label: "Upload de Imagem",
                              type: "file",
                            },
                          ]}
                        />
                      ),
                      deletar: (
                        <CustomDialog
                          triggerLabel={<FaTrash />}
                          title="Deletar Peça"
                          TypeButton="Deletar"
                          description="Deseja realmente deletar esta peça?"
                        />
                      ),
                    }))}
                    actions={(item) => (
                      <div className="flex space-x-2">
                        {item.editar}
                        {item.deletar}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center my-6">
              <PecasEstoquePieChart />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
