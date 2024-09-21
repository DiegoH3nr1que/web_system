import { View, Text, FlatList, ScrollView } from "react-native";

const EstoquePage = () => {
  const pecasEstoque = [
    { nome: "Peça A", quantidade: 100 },
    { nome: "Peça B", quantidade: 50 },
    { nome: "Peça C", quantidade: 200 },
  ];

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text className="text-2xl font-bold mb-4 my-6">Consulta de Estoque</Text>
      <FlatList
        data={pecasEstoque}
        renderItem={({ item }) => (
          <View className="border rounded-lg p-4 mb-2">
            <Text className="font-bold">{item.nome}</Text>
            <Text>Quantidade em Estoque: {item.quantidade}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

export default EstoquePage;
