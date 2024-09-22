import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";

export default function MachineDetails() {
  // Dados mockados com histórico de manutenções
  const machines = [
    {
      nome: "Máquina X",
      tipo: "Industrial",
      modelo: 2024,
      data_fabricacao: "03/01/2024",
      num_serie: "SN123456789",
      localizacao: "Fábrica 1 - Setor B",
      imagem:
        "https://evanplast.com.br/wp-content/uploads/2020/11/injetora-de-plastico-768x451.png",
      manutencoes: [
        { data: "10/02/2024", descricao: "Troca de óleo" },
        { data: "12/05/2024", descricao: "Substituição de correias" },
        { data: "18/07/2024", descricao: "Revisão geral" },
      ],
    },
    {
      nome: "Máquina Y",
      tipo: "Industrial",
      modelo: 2023,
      data_fabricacao: "12/06/2023",
      num_serie: "SN987654321",
      localizacao: "Fábrica 2 - Setor A",
      imagem:
        "https://metalurgicatresj.com.br/wp-content/uploads/2024/07/maquina1.png",
      manutencoes: [
        { data: "20/01/2024", descricao: "Reparação do motor elétrico" },
        { data: "15/03/2024", descricao: "Substituição de bateria" },
        { data: "25/08/2024", descricao: "Troca de filtro de ar" },
      ],
    },
  ];

  // Estado para controlar a exibição do histórico de manutenções
  const [historicoVisivel, setHistoricoVisivel] = useState(
    Array(machines.length).fill(false)
  );

  const toggleHistorico = (index) => {
    const novoEstado = [...historicoVisivel];
    novoEstado[index] = !novoEstado[index];
    setHistoricoVisivel(novoEstado);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4 my-8">
      <Text className="text-2xl font-bold mb-4 text-center text-gray-800">
        Detalhes das Máquinas
      </Text>

      {machines.map((item, index) => (
        <View
          key={index}
          className="mb-6 p-4 border rounded-lg bg-white shadow-md flex flex-row"
        >
          <View className="flex-1">
            <View className="mb-4">
              <Text className="text-sm text-gray-600">Nome</Text>
              <Text className="text-lg text-gray-800">{item.nome}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600">Tipo</Text>
              <Text className="text-lg text-gray-800">{item.tipo}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600">Modelo</Text>
              <Text className="text-lg text-gray-800">{item.modelo}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600">Data de Fabricação</Text>
              <Text className="text-lg text-gray-800">
                {item.data_fabricacao}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600">Número de Série</Text>
              <Text className="text-lg text-gray-800">{item.num_serie}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600">Localização</Text>
              <Text className="text-lg text-gray-800">{item.localizacao}</Text>
            </View>

            {/* Botão para ver/ocultar histórico de manutenções */}
            <TouchableOpacity
              className="bg-gray-700 p-4 rounded-md mt-4"
              onPress={() => toggleHistorico(index)}
            >
              <Text className="text-center text-white font-bold">
                {historicoVisivel[index]
                  ? "Ocultar Histórico"
                  : "Ver Histórico"}
              </Text>
            </TouchableOpacity>

            {/* Histórico de Manutenções Condicional */}
            {historicoVisivel[index] && (
              <View className="mt-4">
                <Text className="text-lg font-bold mb-2 text-gray-800">
                  Histórico de Manutenções
                </Text>
                {item.manutencoes.map((manutencao, manutencaoIndex) => (
                  <View key={manutencaoIndex} className="mb-2">
                    <View className=" flex flex-1 border border-black-500 rounded-md">
                      <Text className="text-sm text-gray-600 m-1">
                        Data: {manutencao.data}
                      </Text>
                      <Text className="text-sm text-gray-600 m-1">
                        Descrição: {manutencao.descricao}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            <View className="flex flex-row justify-between mt-6">
              <TouchableOpacity
                className="bg-gray-700 p-4 rounded-md flex-1 mr-2"
                onPress={() => alert("Editar Máquina")}
              >
                <Text className="text-center text-white font-bold">Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-600 p-4 rounded-md flex-1 ml-2"
                onPress={() => alert("Deletar Máquina")}
              >
                <Text className="text-center text-white font-bold">
                  Deletar
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Image
            source={{ uri: item.imagem }}
            style={{ width: 100, height: 100, marginLeft: 10 }}
            resizeMode="contain"
            borderRadius={10}
          />
        </View>
      ))}
    </ScrollView>
  );
}
