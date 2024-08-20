'use client';
import { Footer } from "../components/footer";
import { Aside } from "../components/aside";
import { Card } from "../components/card";
import { FaBuilding, FaTools } from "react-icons/fa";
import { MdDashboard, MdForklift } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ChartComponent } from "../components/chart";
import ProtectedRoute from "../components/protectedRouter";
import { RealTimeClock } from "../components/realTimeClock";

export default function Home() {
  const cards = [
    {
      color: "border bg-background",
      title: "",
      text: "Ambientes",
      icon: <FaBuilding size={48} />,
    },
    {
      color: "border bg-background",
      title: "",
      text: "Equipamentos",
      icon: <MdDashboard size={48} />,
    },
    {
      color: "border bg-background",
      title: "",
      text: "O.S. Alertas",
      icon: <MdForklift size={48} />,
    },
    {
      color: "border bg-background",
      title: "",
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
    <ProtectedRoute>
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex">
          <Aside />
          <main className="flex-1 flex flex-col p-6 bg-background">
            <header className="text-left p-4 rounded-md mb-6 flex justify-between">
              <h1 className="text-4xl font-bold uppercase text-foreground">
                Sistema de Gestão de Manutenção
              </h1>
              <RealTimeClock/>
            </header>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((props) => (
                  <Card
                    color={props.color}
                    title={props.title}
                    text={props.text}
                    icon={props.icon}
                  />
                ))}
              </div>

              <div className="container mx-auto p-4 bg-background rounded-lg m-5">
                <div className=" max-h-full overflow-y-auto shadow-lg">
                  <ChartComponent/>
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
