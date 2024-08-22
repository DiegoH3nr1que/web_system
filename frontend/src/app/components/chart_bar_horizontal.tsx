"use client";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [
  { equipes: "equipe_a", manutencoes: 275, fill: "hsl(var(--foreground))" },
  { equipes: "equipe_b", manutencoes: 200, fill: "hsl(var(--foreground))" },
  { equipes: "equipe_c", manutencoes: 187, fill: "hsl(var(--foreground))" },
  { equipes: "equipe_d", manutencoes: 173, fill: "hsl(var(--foreground))" },
  { equipes: "equipe_e", manutencoes: 90, fill: "hsl(var(--foreground))" },
];

const chartConfig = {
  manutencoes: {
    label: "manutenções realizadas",
  },
  equipe_a: {
    label: "Equipe A",
  },
  equipe_b: {
    label: "Equipe B",
  },
  equipe_c: {
    label: "Equipe C",
  },
  equipe_d: {
    label: "Equipe D",
  },
  equipe_e: {
    label: "Equipe E",
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

export function ChartBarComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatório de manutenções</CardTitle>
        <CardDescription>Realizados por cada Equipe</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="equipes"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="manutencoes" type="number" hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="manutencoes" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
