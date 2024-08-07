"use client";
import { Footer } from "../components/footer";
import { Aside } from "../components/aside";
import { Card } from "../components/card";
import { FaBuilding, FaTools, FaUsers } from "react-icons/fa";
import { MdDashboard, MdForklift } from "react-icons/md";
import Table from "../components/table";

export default function Home() {
  const cards = [
    {
      color: "bg-orange-200",
      qty: "100",
      text: "Ambientes",
      icon: <MdDashboard size={48} />,
    },
    {
      color: "bg-blue-200",
      qty: "100",
      text: "Equipamentos",
      icon: <FaBuilding size={48} />,
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

  const dados = [
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
    {
      ambiente: "Senai",
      equipamento: "Torno CNC",
      solicitacao: 1906,
      atendimento: 1906,
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex">
        <Aside />
        <main className="flex-1 p-6 bg-white rounded-md">
          <header className="text-center bg-blue-100 p-4 rounded-md mb-6">
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

            <div className="container mx-auto p-4 bg-white rounded-lg">
              <h1 className="text-2xl font-bold mb-4 text-center text-black">
                Tabela de Equipamentos
              </h1>
              <div className="max-h-96 overflow-y-auto">
                <Table dados={dados} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
