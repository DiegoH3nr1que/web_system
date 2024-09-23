import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // Importando useRouter

// Definindo o tipo para uma peça
interface Peca {
  nome: string;
  entrada: number;
  saida: number;
  data: string;
  quantidade: number;
  estoque: number;
}

const PecasPage = () => {
  const router = useRouter(); // Usando useRouter
  const [nome, setNome] = useState("");
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");
  const [data, setData] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [estoque, setEstoque] = useState("");

  // Tipando o estado "pecas" como um array de objetos do tipo Peca
  const [pecas, setPecas] = useState<Peca[]>([]);

  const adicionarPeca = () => {
    if (nome && entrada && saida && data && quantidade && estoque) {
      const novaPeca: Peca = {
        nome,
        entrada: Number(entrada),
        saida: Number(saida),
        data,
        quantidade: Number(quantidade),
        estoque: Number(estoque),
      };
      setPecas([...pecas, novaPeca]);
      setNome("");
      setEntrada("");
      setSaida("");
      setData("");
      setQuantidade("");
      setEstoque("");
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text className="text-2xl font-bold mb-4 my-6">Registro de Peças</Text>

      <View className="mb-4">
        <TextInput
          placeholder="Nome"
          placeholderTextColor="gray"
          value={nome}
          onChangeText={setNome}
          className="border p-2 mb-2"
        />
        <TextInput
          placeholder="Entradas"
          placeholderTextColor="gray"
          value={entrada}
          onChangeText={setEntrada}
          keyboardType="numeric"
          className="border p-2 mb-2"
        />
        <TextInput
          placeholder="Saídas"
          placeholderTextColor="gray"
          value={saida}
          onChangeText={setSaida}
          keyboardType="numeric"
          className="border p-2 mb-2"
        />
        <TextInput
          placeholder="Data (DD/MM/AAAA)"
          placeholderTextColor="gray"
          value={data}
          onChangeText={setData}
          className="border p-2 mb-2"
        />
        <TextInput
          placeholder="Quantidade"
          placeholderTextColor="gray"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
          className="border p-2 mb-2"
        />
        <TextInput
          placeholder="Estoque"
          placeholderTextColor="gray"
          value={estoque}
          onChangeText={setEstoque}
          keyboardType="numeric"
          className="border p-2 mb-4"
        />

        <TouchableOpacity
          onPress={adicionarPeca}
          className="bg-gray-700 p-4 rounded-md"
        >
          <Text className="text-white text-center">Adicionar Peça</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-bold mb-2">Lista de Peças</Text>

      {pecas.length > 0 ? (
        pecas.map((item, index) => (
          <View key={index} className="border rounded-lg p-4 mb-2">
            <Text className="font-bold">{item.nome}</Text>
            <Text>Entradas: {item.entrada}</Text>
            <Text>Saídas: {item.saida}</Text>
            <Text>Data: {item.data}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Estoque: {item.estoque}</Text>
          </View>
        ))
      ) : (
        <Text>Nenhuma peça cadastrada.</Text>
      )}

      {/* Botão para ver o estoque */}
      <TouchableOpacity
        onPress={() => router.push("/stockPage")}
        className="bg-blue-600 p-4 rounded-md mt-4"
      >
        <Text className="text-white text-center">Ver Estoque</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PecasPage;
