"use client";
import { Aside } from "../components/aside";
import { Footer } from "../components/footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../components/table";
import { CustomDialog } from "../components/dialog";
import ProtectedRoute from "../components/protectedRouter";
import { RealTimeClock } from "../components/realTimeClock";

export default function AmbientesPage() {
  const columns = [
    { header: "Nome", accessor: "nome" },
    { header: "Tipo do Ambiente", accessor: "tipo_ambiente" },
    { header: "Localização", accessor: "localizacao" },
    { header: "Condição do ambiente", accessor: "condicao_ambiente" },
    { header: "Equipe de manutenção", accessor: "equipe_manutencao" },
    { header: "Manutenções Realizadas", accessor: "manutencoes_realizadas" },
  ];

  const statusOptions = [
    { value: "normal", label: "Normal" },
    { value: "em_manutencao", label: "Em manutenção" },
    { value: "aguardando_limpeza", label: "Aguardando Limpeza" },
    { value: "manutencao_cancelada", label: "Manutenção Cancelada" },
  ];

  const equipeOptions = [
    { value: "equipe_a", label: "Equipe A" },
    { value: "equipe_b", label: "Equipe B" },
    { value: "equipe_c", label: "Equipe C" },
    { value: "equipe_d", label: "Equipe D" },
    { value: "equipe_e", label: "Equipe E" },
  ];

  const data = [
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
    },
    {
      nome: "Sala de Controle Principal",
      tipo_ambiente: "Sala automação",
      localizacao: "Setor A, Ala Norte",
      condicao_ambiente: "Em manutenção",
      equipe_manutencao: "Equipe B",
      manutencoes_realizadas: 4,
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
                  <CustomDialog
                    triggerLabel="Cadastrar Ambiente"
                    title="Cadastrar Ambiente"
                    TypeButton="Cadastrar"
                    description="Insira todos os campos corretamente!"
                    fields={[
                      { id: "nome", label: "Nome", type: "text" },
                      {
                        id: "tipo_ambiente",
                        label: "Tipo de Ambiente",
                        type: "text",
                      },
                      { id: "localizacao", label: "Localização", type: "text" },
                      
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
                          title="Editar Ambiente"
                          TypeButton="Editar"
                          description="Insira todos os campos corretamente!"
                          fields={[
                            { id: "nome", label: "Nome", type: "text" },
                            {
                              id: "tipo_ambiente",
                              label: "Tipo de Ambiente",
                              type: "text",
                            },
                            { id: "localizacao", label: "Localização", type: "text" },
                            {
                              id: "condicao_ambiente",
                              label: "Condição do ambiente",
                              type: "select",
                              options: statusOptions,
                            },
                            {
                              id: "equipe_manutencao",
                              label: "Equipe de Manutenção",
                              type: "select",
                              options: equipeOptions,
                            },
                            {
                              id: "manutencoes_realizadas",
                              label: "Manutençoes Realizadas",
                              type: "number",
                            },
                          ]}
                        />
                        <CustomDialog
                          triggerLabel={<FaTrash />}
                          title="Deletar Ambiente "
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
