"use client";
import { useState, useEffect } from "react";
import { Aside } from "@/app/components/aside";
import { Footer } from "@/app/components/footer";
import ProtectedRoute from "@/app/components/protectedRouter";
import { RealTimeClock } from "@/app/components/realTimeClock";
import { CustomPieChart } from "../components/pieChart";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

        const totalMaintenanceCompleted = maintenances.filter(m => m.status === "completed").length;

        const partsRes = await axios.get("http://localhost:8000/inventory/parts", {
          headers: {
            Authorization: `Bearer SEU_TOKEN_AQUI`,
          },
        });
        const parts = partsRes.data;

        const totalPartsUsed = parts.reduce(
          (acc, part) => acc + (part.entry_quantity - part.exit_quantity), 0
        );

        setPerformanceData({
          totalMaintenanceCompleted,
          totalPartsUsed,
        });

        const machineCount = {};
        maintenances.forEach((m) => {
          machineCount[m.machine_id] = (machineCount[m.machine_id] || 0) + 1;
        });

        const manutencoesPorMaquina = Object.entries(machineCount).map(([machineId, count], index) => ({
          nome: `Máquina ${machineId}`,
          valor: count,
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

  const handleDownloadReport = () => {
    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(18).setFont("helvetica", "bold");
    doc.text("Relatório de Desempenho", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    const dataAtual = new Date().toLocaleDateString("pt-BR");
    doc.setFontSize(12).text(`Data: ${dataAtual}`, 20, 30);

    // Seção de Dados Gerais
    doc.setFontSize(14).text("Resumo de Desempenho", 20, 40);
    doc.setFontSize(12);
    doc.text(`• Manutenções concluídas: ${performanceData.totalMaintenanceCompleted}`, 20, 50);
    doc.text(`• Total de Peças Utilizadas: ${performanceData.totalPartsUsed}`, 20, 60);

    // Manutenções por Máquina
    doc.autoTable({
      startY: 70,
      head: [["Máquina", "Manutenções Realizadas"]],
      body: manutencoesData.map((m) => [m.nome, m.valor.toString()]),
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
    });

    // Estoque de Peças
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 10,
      head: [["Peça", "Quantidade em Estoque"]],
      body: pecasData.map((p) => [p.nome, p.valor.toString()]),
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Rodapé
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(
        `Página ${i} de ${totalPages}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    doc.save("relatorio_desempenho.pdf");
  };

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col overflow-y-auto relative">
        <div className="flex-1 flex">
          <Aside />
          <main className="flex-1 flex flex-col p-6 bg-background">
            <header className="text-left p-4 rounded-md mb-6 flex justify-between items-center">
              <h1 className="text-4xl font-bold uppercase text-foreground">Relatórios de Desempenho</h1>
              <div className="flex items-center gap-4">
                <RealTimeClock />
                <button onClick={handleDownloadReport} className="px-4 py-2 bg-blue-500 text-white rounded">Download de Relatório</button>
              </div>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold text-foreground">Manutenções concluídas</h2>
                <p className="text-2xl font-bold text-foreground mt-2">{performanceData.totalMaintenanceCompleted || 0}</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold text-foreground">Total de Peças</h2>
                <p className="text-2xl font-bold text-foreground mt-2">{performanceData.totalPartsUsed || 0}</p>
              </div>
            </section>
            <section className="mt-6">
              <div className="flex justify-center my-6 gap-5">
                <CustomPieChart data={pecasData} dataKey="valor" nameKey="nome" title="Estoque de Peças" description={pecasData.length ? "Mostrando o total de peças em estoque" : "Dados não disponíveis"} />
                <CustomPieChart data={manutencoesData} dataKey="valor" nameKey="nome" title="Manutenções por máquina" description={manutencoesData.length ? "Mostrando as manutenções por máquina e total" : "Dados não disponíveis"} />
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
