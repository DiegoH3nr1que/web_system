import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/services/axiosInstance";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

const chartConfig = {
  manutencoes: {
    label: "Manutenções ",
    color: "hsl(var(--foreground))",
  },
} satisfies ChartConfig;

interface CustomTooltipProps {
  active?: boolean;
  payload?: any;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-lg rounded-md text-sm text-black">
        <p className="mb-1">{payload[0].payload.month}</p>
        <p>
          <span className="font-semibold">{chartConfig.manutencoes.label}</span>
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function ChartComponent() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const response = await api.get("/maintenances/chart-data");
        const formattedData = response.data.map((item: any) => {
          const [year, month] = item.month.split("-");
          const date = new Date(parseInt(year), parseInt(month) - 1);

          return {
            month: date.toLocaleString("default", { month: "long" }),
            manutencoes: item.manutencoes,
          };
        });

        setChartData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar os dados do gráfico:", error);
      }
    }
    fetchChartData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de manutenções por mês</CardTitle>
        <CardDescription>2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="manutencoes" fill="var(--color-manutencoes)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
