import React from "react";
import { View, Text, Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit"; // Importando o ProgressChart

const ChartComponent = () => {
  // Dados de exemplo para as manutenções
  const maintenanceData = [
    { id: 1, type: "Elétrica", count: 15 },
    { id: 2, type: "Hidráulica", count: 10 },
    { id: 3, type: "Preventiva", count: 20 },
    { id: 4, type: "Corretiva", count: 5 },
  ];

  // Calculando o total de manutenções
  const totalCount = maintenanceData.reduce((acc, item) => acc + item.count, 0);

  // Convertendo os dados para o formato necessário
  const data = {
    labels: maintenanceData.map(item => item.type), // Tipos de manutenção
    data: maintenanceData.map(item => item.count / totalCount), // Proporção de cada tipo
  };

  const chartConfig = {
    backgroundColor: "#E2E8F0",
    backgroundGradientFrom: "#E2E8F0",
    backgroundGradientTo: "#D1D5DB",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View className="flex-1 justify-center items-center w-full mx-auto">
      <Text className="text-xl font-semibold text-gray-800 mb-4">Dados de Manutenções</Text>
      <ProgressChart
        data={data}
        width={Dimensions.get("window").width - 40} // Largura da tela menos uma margem
        height={200} // Altura do gráfico
        strokeWidth={16} // Espessura do traço
        radius={32} // Raio interno do gráfico
        chartConfig={chartConfig}
        hideLegend={true} // Mostrar legenda
      />
    </View>

  );
};

export default ChartComponent;
