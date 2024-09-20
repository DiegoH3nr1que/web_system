import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function MachineDetails() {
    // Dados mockados
    const [machine, setMachine] = useState({
        nome: "Máquina X",
        tipo: "Industrial",
        modelo: 2024,
        data_fabricacao: "03/01/2024",
        num_serie: "SN123456789",
        localizacao: "Fábrica 1 - Setor B"
    });

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white p-6">
            <View className="rounded-lg bg-slate-100 p-6">
                <Text className="text-2xl font-bold mb-4 text-center">
                    Detalhes da Máquina
                </Text>

                <View className="mb-4">
                    <Text className="text-sm text-gray-500">Nome</Text>
                    <Text className="text-lg">{machine.nome}</Text>
                </View>

                <View className="mb-4">
                    <Text className="text-sm text-gray-500">Tipo</Text>
                    <Text className="text-lg">{machine.tipo}</Text>
                </View>

                <View className="mb-4">
                    <Text className="text-sm text-gray-500">Modelo</Text>
                    <Text className="text-lg">{machine.modelo}</Text>
                </View>

                <View className="mb-4">
                    <Text className="text-sm text-gray-500">Data de Fabricação</Text>
                    <Text className="text-lg">{machine.data_fabricacao}</Text>
                </View>

                <View className="mb-4">
                    <Text className="text-sm text-gray-500">Número de Série</Text>
                    <Text className="text-lg">{machine.num_serie}</Text>
                </View>

                <View className="mb-4">
                    <Text className="text-sm text-gray-500">Localização</Text>
                    <Text className="text-lg">{machine.localizacao}</Text>
                </View>

                <View className="flex flex-row justify-between mt-6">
                    <TouchableOpacity
                        className="bg-blue-500 p-4 rounded-md flex-1 mr-2"
                        onPress={() => alert("Editar Máquina")}
                    >
                        <Text className="text-center text-white font-bold">Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-red-500 p-4 rounded-md flex-1 ml-2"
                        onPress={() => alert("Deletar Máquina")}
                    >
                        <Text className="text-center text-white font-bold">Deletar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
