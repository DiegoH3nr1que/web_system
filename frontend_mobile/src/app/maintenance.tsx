import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";

type Manutencao = {
  id: number;
  descricao: string;
  razao: string;
  status: string;
  prioridade: string;
  responsavel: string;
  equipe: string;
  data: string;
  comentario?: string; // Campo opcional para comentários
  materiais?: string; // Materiais utilizados na manutenção
  imagem: string; // URL da imagem da manutenção
};

export default function HistoricoManutencao() {
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([
    {
      id: 1,
      descricao: "Troca de óleo",
      razao: "Desgaste natural",
      status: "Pendente",
      prioridade: "Média",
      responsavel: "Diego",
      equipe: "Equipe B",
      data: "02/08/2024",
      comentario: "",
      materiais: "",
      imagem:
        "https://res.cloudinary.com/dwzoumrho/image/upload/f_auto,q_auto:good/v1602780695/M%C3%A1quina-de-Troca-de-%C3%93leo-de-C%C3%A2mbio-Autom%C3%A1tico-2_vhllzr.png",
    },
    {
      id: 2,
      descricao: "Substituição de correias",
      razao: "Correias desgastadas",
      status: "Pendente",
      prioridade: "Alta",
      responsavel: "Carlos",
      equipe: "Equipe A",
      data: "10/09/2024",
      comentario: "",
      materiais: "",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGj0cPzZA3VR3M_CIlByn5I8qc_rbQOKn3rg&s",
    },
  ]);

  const [descricao, setDescricao] = useState("");
  const [razao, setRazao] = useState("");
  const [prioridade, setPrioridade] = useState("Média");
  const [responsavel, setResponsavel] = useState("");
  const [equipe, setEquipe] = useState("");
  const [comentario, setComentario] = useState("");
  const [materiais, setMateriais] = useState("");

  const adicionarManutencao = () => {
    if (descricao && razao && responsavel) {
      const novaManutencao: Manutencao = {
        id: manutencoes.length + 1,
        descricao,
        razao,
        status: "Pendente",
        prioridade,
        responsavel,
        equipe,
        data: new Date().toLocaleDateString(),
        comentario: "",
        materiais: "",
        imagem: "https://via.placeholder.com/100",
      };
      setManutencoes([...manutencoes, novaManutencao]);
      setDescricao("");
      setRazao("");
      setResponsavel("");
      setEquipe("");
    }
  };

  const marcarEmManutencao = (id: number) => {
    setManutencoes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Em Andamento", comentario } : item
      )
    );
    setComentario(""); // Limpa o campo de comentário após marcar
  };

  const finalizarManutencao = (id: number) => {
    const manutencao = manutencoes.find((item) => item.id === id);
    // Verificar se o comentário e materiais foram preenchidos
    if (!comentario || !materiais) {
      Alert.alert(
        "Erro",
        "Por favor, preencha o comentário e os materiais utilizados antes de finalizar a manutenção."
      );
      return;
    }

    setManutencoes((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Finalizada", comentario, materiais }
          : item
      )
    );

    // Limpar campos após finalizar
    setComentario("");
    setMateriais("");
  };

  return (
    <FlatList
      data={manutencoes}
      ListHeaderComponent={() => (
        <View className="p-4 my-6">
          <Text className="text-2xl font-bold mb-4 text-center text-gray-800">
            Histórico de Manutenções
          </Text>

          {/* Formulário para adicionar nova manutenção */}
          <View className="my-6 p-4 border rounded-lg bg-white shadow-md">
            <Text className="text-xl font-bold mb-2 text-gray-800">
              Adicionar Nova Manutenção
            </Text>

            <TextInput
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descrição"
              className="border border-gray-300 rounded-md p-2 mb-4"
              placeholderTextColor="gray"
            />

            <TextInput
              value={razao}
              onChangeText={setRazao}
              placeholder="Razão"
              className="border border-gray-300 rounded-md p-2 mb-4"
              placeholderTextColor="gray"
            />

            <TextInput
              value={responsavel}
              onChangeText={setResponsavel}
              placeholder="Responsável"
              className="border border-gray-300 rounded-md p-2 mb-4"
              placeholderTextColor="gray"
            />
            <TextInput
              value={equipe}
              onChangeText={setEquipe}
              placeholder="Equipe"
              className="border border-gray-300 rounded-md p-2 mb-4"
              placeholderTextColor="gray"
            />

            <TouchableOpacity
              className="bg-gray-700 p-4 rounded-md"
              onPress={adicionarManutencao}
            >
              <Text className="text-center text-white font-bold">
                Adicionar Manutenção
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      renderItem={({ item }) => (
        <View className="my-4 p-4 border rounded-lg bg-white shadow-md">
          <Image
            source={{ uri: item.imagem }}
            style={{ width: 100, height: 100, marginBottom: 10 }}
            resizeMode="contain"
            borderRadius={10}
          />
          <Text className="text-xl font-bold text-gray-800">
            {item.descricao}
          </Text>
          <Text className="text-gray-600">Razão: {item.razao}</Text>
          <Text className="text-gray-600">Status: {item.status}</Text>
          <Text className="text-gray-600">Prioridade: {item.prioridade}</Text>
          <Text className="text-gray-600">Responsável: {item.responsavel}</Text>
          <Text className="text-gray-600">Equipe: {item.equipe}</Text>
          <Text className="text-gray-600">Data: {item.data}</Text>

          {item.status === "Pendente" && (
            <View style={{ marginTop: 20 }}>
              <TextInput
                value={comentario}
                onChangeText={setComentario}
                placeholder="Adicionar comentário"
                className="border border-gray-300 rounded-md p-2 mb-4"
                placeholderTextColor="gray"
              />
              <TouchableOpacity
                className="bg-gray-600 p-2 rounded-md"
                onPress={() => marcarEmManutencao(item.id)}
              >
                <Text className="text-center text-white font-bold">
                  Marcar como "Em Manutenção"
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {item.status === "Em Andamento" && (
            <View style={{ marginTop: 20 }}>
              <TextInput
                value={comentario}
                onChangeText={setComentario}
                placeholder="Comentário sobre a manutenção"
                className="border border-gray-300 rounded-md p-2 mb-4"
                placeholderTextColor="gray"
              />
              <TextInput
                value={materiais}
                onChangeText={setMateriais}
                placeholder="Materiais utilizados"
                className="border border-gray-300 rounded-md p-2 mb-4"
                placeholderTextColor="gray"
              />
              <TouchableOpacity
                className="bg-green-600 p-2 rounded-md"
                onPress={() => finalizarManutencao(item.id)}
              >
                <Text className="text-center text-white font-bold">
                  Finalizar Manutenção
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Exibir comentário e materiais após finalização */}
          {item.status === "Finalizada" && (
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginBottom: 10,
                }}
              />
              <Text className="text-gray-600 font-bold">Comentário:</Text>
              <Text className="text-gray-600">{item.comentario}</Text>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginVertical: 10,
                }}
              />

              <Text className="text-gray-600 font-bold">
                Materiais Utilizados:
              </Text>
              <Text className="text-gray-600">{item.materiais}</Text>
            </View>
          )}
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
