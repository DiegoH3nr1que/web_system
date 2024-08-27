"use client";

import * as React from "react";
import { Label, Pie, PieChart, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const pecasData = [
  { nome: "Peça X", estoque: 50, fill: "hsl(var(--chart-1))" },
  { nome: "Peça Y", estoque: 100, fill: "hsl(var(--chart-2))" },
];

const chartConfig = {
  estoque: {
    label: "Estoque",
  },
  "Peça X": {
    label: "Máquina X",
    color: "hsl(var(--chart-1))",
  },
  "Peça Y": {
    label: "Máquina Y",
    color: "hsl(var(--chart-2))",
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
        <p className="mb-1">{payload[0].name}</p>
        <p>
          <span className="font-semibold">{chartConfig.estoque.label}</span>
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function PecasEstoquePieChart() {
  const totalEstoque = React.useMemo(() => {
    return pecasData.reduce((acc, curr) => acc + curr.estoque, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Estoque de Peças</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={pecasData}
              dataKey="estoque"
              nameKey="nome"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalEstoque.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Estoque Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Estoque atualizado
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando o total de estoque para as peças cadastradas.
        </div>
      </CardFooter>
    </Card>
  );
}
