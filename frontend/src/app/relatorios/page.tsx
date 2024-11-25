"use client";
import { useState, useEffect } from "react";
import { Aside } from "@/app/components/aside";
import { Footer } from "@/app/components/footer";
import ProtectedRoute from "@/app/components/protectedRouter";
import { RealTimeClock } from "@/app/components/realTimeClock";
import { CustomPieChart } from "../components/pieChart";

const pecasData = [
  { nome: "Peça X", valor: 50, fill: "hsl(var(--chart-1))" },
  { nome: "Peça Y", valor: 100, fill: "hsl(var(--chart-2))" },
];

const ManutencoesData = [
  { nome: "Máquina X", valor: 3, fill: "hsl(var(--chart-1))" },
  { nome: "Máquina Y", valor: 2, fill: "hsl(var(--chart-2))" },
];
const fetchPerformanceData = () => {
  return {
    averageResolutionTime: "4 horas",
    totalMaintenanceCompleted: 120,
    totalPartsUsed: 350,
  };
};

export default function RelatoriosDesempenhoPage() {
  const [performanceData, setPerformanceData] = useState({
    averageResolutionTime: "",
    totalMaintenanceCompleted: 0,
    totalPartsUsed: 0,
  });

  useEffect(() => {
    const data = fetchPerformanceData();
    setPerformanceData(data);
  }, []);

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col overflow-y-auto relative">
        <div className="flex-1 flex">
          <Aside />
          <main className="flex-1 flex flex-col p-6 bg-background">
            <header className="text-left p-4 rounded-md mb-6 flex justify-between">
              <h1 className="text-4xl font-bold uppercase text-foreground">
                Relatórios de Desempenho
              </h1>
              <RealTimeClock />
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold text-foreground">
                  Tempo Médio de Resolução
                </h2>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {performanceData.averageResolutionTime}
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold text-foreground">
                  Manutenções Realizadas
                </h2>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {performanceData.totalMaintenanceCompleted}
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold text-foreground">
                  Peças Utilizadas
                </h2>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {performanceData.totalPartsUsed}
                </p>
              </div>
            </section>
            <section className="mt-6">
              <div className="flex justify-center my-6 gap-5">
                <CustomPieChart
                  data={pecasData}
                  dataKey="valor"
                  nameKey="nome"
                  title="Estoque de Peças"
                  description="Mostrando o total de peças em estoque"
                />
                <CustomPieChart
                  data={ManutencoesData}
                  dataKey="valor"
                  nameKey="nome"
                  title="Manutenções por máquina"
                  description="Mostrando as manutenções por máquina e total"
                />
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
