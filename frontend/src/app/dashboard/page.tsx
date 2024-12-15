"use client";
import { Footer } from "../components/footer";
import { Aside } from "../components/aside";
import { Card } from "../components/card";
import { FaBuilding, FaTools } from "react-icons/fa";
import { MdDashboard, MdForklift } from "react-icons/md";
import { ChartComponent } from "../components/chart";
import ProtectedRoute from "../components/protectedRouter";
import { RealTimeClock } from "../components/realTimeClock";
import Link from "next/link";

export default function Home() {
  const cards = [
    {
      Target: "/ambientes",
      color: "border bg-background",
      title: "",
      text: "Ambientes",
      icon: <FaBuilding size={48} />,
    },
    {
      Target: "/equipamentos/maquinas",
      color: "border bg-background",
      title: "",
      text: "Equipamentos",
      icon: <MdDashboard size={48} />,
    },
    {
      Target: "/manutencoes",
      color: "border bg-background",
      title: "",
      text: "O.S. Alertas",
      icon: <MdForklift size={48} />,
    },
    {
      Target: "/manutencoes",
      color: "border bg-background",
      title: "",
      text: "O.S. Concluídas",
      icon: <FaTools size={48} />,
    },
  ];

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col overflow-y-auto scroll-invisivel relative">
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Sidebar */}
          <Aside />

          {/* Main Content */}
          <main className="flex-1 flex flex-col p-4 lg:p-6 bg-background">
            {/* Header */}
            <header className="text-left p-4 rounded-md mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl md:text-4xl font-bold uppercase text-foreground text-center md:text-left">
                Sistema de Gestão de Manutenção
              </h1>
              <RealTimeClock />
            </header>

            {/* Cards Section */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                {cards.map((props) => (
                  <Link key={props.Target} href={props.Target} passHref>
                    <div className="cursor-pointer">
                      <Card
                        color={props.color}
                        title={props.title}
                        text={props.text}
                        icon={props.icon}
                      />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Chart Section */}
                <div className="grid grid-cols-1 gap-4 max-h-full overflow-y-auto">
                  <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-4 bg-background rounded-lg shadow-lg">
                    <ChartComponent />
                  </div>
                </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
