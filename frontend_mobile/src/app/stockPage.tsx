import { View, Text, FlatList } from "react-native";

const EstoquePage = () => {
  const pecasEstoque = [
    { nome: "Peça A", quantidade: 100 },
    { nome: "Peça B", quantidade: 50 },
    { nome: "Peça C", quantidade: 200 },
  ];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text className="text-2xl font-bold mb-4 my-6">Consulta de Estoque</Text>

      {/* FlatList para exibir as peças no estoque */}
      <FlatList
        data={pecasEstoque} // Fonte de dados para o FlatList
        renderItem={({ item }) => (
          <View className="border rounded-lg p-4 mb-2">
            <Text className="font-bold">{item.nome}</Text>
            <Text>Quantidade em Estoque: {item.quantidade}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Definindo a chave única de cada item
        ListEmptyComponent={() => (
          <Text className="text-gray-500 text-center mt-4">
            Nenhuma peça no estoque.
          </Text>
        )} // Componente para exibir se a lista estiver vazia
      />
    </View>
  );
};

export default EstoquePage;
