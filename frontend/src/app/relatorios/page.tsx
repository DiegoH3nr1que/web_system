"use client";
import { useState, useEffect } from "react";
import { Aside } from "@/app/components/aside";
import { Footer } from "@/app/components/footer";
import ProtectedRoute from "@/app/components/protectedRouter";
import { RealTimeClock } from "@/app/components/realTimeClock";
import { CustomPieChart } from "../components/pieChart";
import axios from "axios";

export default function RelatoriosDesempenhoPage() {
  const [performanceData, setPerformanceData] = useState({
    totalMaintenanceCompleted: 0,
    totalPartsUsed: 0,
  });

  const [manutencoesData, setManutencoesData] = useState([]);
  const [pecasData, setPecasData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const maintenancesRes = await axios.get("http://localhost:8000/maintenances");
        const maintenances = maintenancesRes.data;

        const totalMaintenanceCompleted = maintenances.length;

        const partsRes = await axios.get("http://localhost:8000/inventory/parts", {
          headers: {
            Authorization: `Bearer SEU_TOKEN_AQUI`
          }
        });
        const parts = partsRes.data;

        const totalPartsUsed = parts.reduce((acc, part) => acc + (part.entry_quantity - part.exit_quantity), 0);

        setPerformanceData({
          totalMaintenanceCompleted,
          totalPartsUsed,
        });

        // Cálculo para o gráfico de manutenções por máquina
        const machineCount = {};
        maintenances.forEach((m) => {
          machineCount[m.machine_id] = (machineCount[m.machine_id] || 0) + 1;
        });

        const manutencoesPorMaquina = Object.keys(machineCount).map((machineId, index) => ({
          nome: `Máquina ${machineId}`,
          valor: machineCount[machineId],
          fill: `hsl(var(--chart-${(index % 10) + 1}))`,
        }));
        
        setManutencoesData(manutencoesPorMaquina);

        const pecasFormatadas = parts.map((part, index) => ({
          nome: part.name,
          valor: part.current_stock,
          fill: `hsl(var(--chart-${(index % 10) + 1}))`,
        }));
        
        setPecasData(pecasFormatadas);
      } catch (error) {
        console.error("Erro ao obter dados do backend:", error);
      }
    }

    fetchData();
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

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold text-foreground">
                  Manutenções Realizadas
                </h2>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {performanceData.totalMaintenanceCompleted || 0}
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold text-foreground">
                  Peças Utilizadas
                </h2>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {performanceData.totalPartsUsed || 0}
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
                  description={
                    pecasData.length
                      ? "Mostrando o total de peças em estoque"
                      : "Dados não disponíveis"
                  }
                />
                <CustomPieChart
                  data={manutencoesData}
                  dataKey="valor"
                  nameKey="nome"
                  title="Manutenções por máquina"
                  description={
                    manutencoesData.length
                      ? "Mostrando as manutenções por máquina e total"
                      : "Dados não disponíveis"
                  }
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
