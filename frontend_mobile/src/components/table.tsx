import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const ChartComponent = () => {
  // Dados de exemplo para o gráfico
  const tableData = [
    { id: 1, name: "John", age: 25, city: "New York" },
    { id: 2, name: "Anna", age: 28, city: "Los Angeles" },
    { id: 3, name: "Peter", age: 34, city: "Chicago" },
    { id: 4, name: "Maria", age: 22, city: "Miami" },
  ];

  // Dados formatados para o gráfico
  const data = {
    labels: tableData.map(item => item.name), // Nomes
    datasets: [
      {
        data: tableData.map(item => item.age), // Idades
      },
    ],
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-200">
      <BarChart
        data={data}
        width={Dimensions.get("window").width - 40} // Largura da tela menos a margem
        height={220}
        yAxisLabel=""
        yAxisSuffix=" anos" 
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 0, // Zero casas decimais
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default ChartComponent;
