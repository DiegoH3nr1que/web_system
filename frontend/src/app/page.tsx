"use client";
import { Footer } from "./components/footer";
import { Aside } from "./components/aside";
import { Card } from "./components/card";
import { FaBuilding, FaTools, FaUsers } from "react-icons/fa";
import { MdDashboard, MdForklift } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "./components/table";

export default function Home() {
  const cards = [
    {
      color: "bg-orange-200",
      qty: "100",
      text: "Ambientes",
      icon: <FaBuilding size={48} />,
    },
    {
      color: "bg-blue-200",
      qty: "100",
      text: "Equipamentos",
      icon: <MdDashboard size={48} />,
    },
    {
      color: "bg-red-200",
      qty: "100",
      text: "O.S. Alertas",
      icon: <MdForklift size={48} />,
    },
    {
      color: "bg-orange-200",
      qty: "100",
      text: "O.S. Concluidas",
      icon: <FaTools size={48} />,
    },
  ];

  const columns = [
    { header: "Ambiente", accessor: "ambiente" },
    { header: "Equipamento", accessor: "equipamento" },
    { header: "Solicitação", accessor: "solicitacao", isNumeric: true },
    { header: "Atendimento", accessor: "atendimento", isNumeric: true },
  ];

  const data = [
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
      editar: <FaEdit />,
      deletar: <FaTrash />,
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 flex flex-col p-6 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300">
          <header className="text-center p-4 rounded-md mb-6">
            <h1 className="text-4xl font-bold uppercase text-blue-900">
              Sistema de Gestão de Manutenção
            </h1>
          </header>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cards.map((props) => (
                <Card
                  color={props.color}
                  qty={props.qty}
                  text={props.text}
                  icon={props.icon}
                />
              ))}
            </div>

            <div className="container mx-auto p-4 bg-white rounded-lg m-5">
              <h1 className="text-2xl font-bold mb-4 text-center text-black">
                Tabela de Equipamentos
              </h1>
              <div className="max-h-96 overflow-y-auto">
                <Table columns={columns} data={data} />
              </div>
            </div>
          </div>
      <Footer />
        </main>
      </div>
    </div>
  );
}
