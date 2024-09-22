import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch,
} from "react-native";
import { useState } from "react";

// Definindo o tipo de um colaborador
type Colaborador = {
  nome: string;
  especialidade: string;
  disponibilidade: boolean;
};

// Definindo o tipo de uma equipe
type Equipe = {
  id: number;
  nome: string;
  colaboradores: Colaborador[];
};

export default function TeamManagement() {
  // Dados mockados para equipes e colaboradores
  const [teams, setTeams] = useState<Equipe[]>([
    {
      id: 1,
      nome: "Equipe A",
      colaboradores: [
        { nome: "João", especialidade: "Eletricista", disponibilidade: true },
        { nome: "Maria", especialidade: "Mecânica", disponibilidade: false },
      ],
    },
    {
      id: 2,
      nome: "Equipe B",
      colaboradores: [
        { nome: "Carlos", especialidade: "Hidráulica", disponibilidade: true },
        { nome: "Ana", especialidade: "Refrigeração", disponibilidade: true },
      ],
    },
  ]);

  // Estado para os novos dados da equipe
  const [nomeEquipe, setNomeEquipe] = useState("");
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [especialidadeColaborador, setEspecialidadeColaborador] = useState("");
  const [disponibilidadeColaborador, setDisponibilidadeColaborador] =
    useState<boolean>(true); // Inicializando como true
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  const addColaborador = () => {
    if (nomeColaborador && especialidadeColaborador) {
      setColaboradores([
        ...colaboradores,
        {
          nome: nomeColaborador,
          especialidade: especialidadeColaborador,
          disponibilidade: disponibilidadeColaborador,
        },
      ]);
      setNomeColaborador("");
      setEspecialidadeColaborador("");
    }
  };

  const cadastrarEquipe = () => {
    if (nomeEquipe && colaboradores.length > 0) {
      const newTeam: Equipe = {
        id: teams.length + 1,
        nome: nomeEquipe,
        colaboradores,
      };
      setTeams([...teams, newTeam]);
      setNomeEquipe("");
      setColaboradores([]);
    }
  };

  return (
    <FlatList
      data={teams}
      ListHeaderComponent={() => (
        <View className="p-4 my-8">
          <Text className="text-2xl font-bold mb-4 text-center text-gray-800">
            Gerenciamento de Equipes
          </Text>

          {/* Formulário para Cadastrar Equipe */}
          <View className="my-6 p-4 border rounded-lg bg-white shadow-md">
            <Text className="text-xl font-bold mb-2 text-gray-800">
              Cadastrar Nova Equipe
            </Text>

            <TextInput
              value={nomeEquipe}
              onChangeText={setNomeEquipe}
              placeholder="Nome da Equipe"
              className="border border-gray-300 rounded-md p-2 mb-4"
              placeholderTextColor="gray"
            />

            <TextInput
              value={nomeColaborador}
              onChangeText={setNomeColaborador}
              placeholder="Nome do Colaborador"
              className="border border-gray-300 rounded-md p-2 mb-4"
              placeholderTextColor="gray"
            />

            <TextInput
              value={especialidadeColaborador}
              onChangeText={setEspecialidadeColaborador}
              placeholder="Especialidade do Colaborador"
              className="border border-gray-300 rounded-md p-2 mb-4"
              placeholderTextColor="gray"
            />

            <View className="flex-row items-center mb-4">
              <Text className="text-gray-800 mr-2">Disponível:</Text>
              <Switch
                value={disponibilidadeColaborador}
                onValueChange={setDisponibilidadeColaborador}
              />
            </View>

            <TouchableOpacity
              className="bg-gray-700 p-4 rounded-md mb-4"
              onPress={addColaborador}
            >
              <Text className="text-center text-white font-bold">
                Adicionar Colaborador
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-700 p-4 rounded-md"
              onPress={cadastrarEquipe}
            >
              <Text className="text-center text-white font-bold">
                Cadastrar Equipe
              </Text>
            </TouchableOpacity>

            {/* Listagem de Colaboradores Adicionados */}
            <FlatList
              data={colaboradores}
              renderItem={({ item }) => (
                <Text className="text-gray-600">
                  {item.nome} - {item.especialidade} -{" "}
                  {item.disponibilidade ? "Disponível" : "Indisponível"}
                </Text>
              )}
              keyExtractor={(item, index) => index.toString()}
              className="mt-4"
            />
          </View>
        </View>
      )}
      renderItem={({ item: team }) => (
        <View
          key={team.id}
          className="my-4 p-4 border rounded-lg bg-white shadow-md"
        >
          <Text className="text-xl font-bold text-gray-800">{team.nome}</Text>
          <FlatList
            data={team.colaboradores}
            renderItem={({ item }) => (
              <View className="flex flex-row justify-between mb-2">
                <Text className="text-gray-600">
                  {item.nome} - {item.especialidade}
                </Text>
                <Text
                  className={`font-bold ${
                    item.disponibilidade ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.disponibilidade ? "Disponível" : "Indisponível"}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
