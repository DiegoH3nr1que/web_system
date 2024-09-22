import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Footer } from "../components/footer";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      router.push("/dashboard");
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      className="bg-gradient-to-r from-gray-200 to-gray-400"
    >
      <View className="flex-1 justify-center p-6">
        <View className="rounded-lg bg-white shadow-lg p-10 border bg-background">
          <Text className="text-center font-extrabold text-3xl text-gray-800 mb-6">
            Sistema de Manutenção
          </Text>

          <View className="flex-row items-center mb-4">
            <Ionicons name="person-outline" size={24} color="gray" />
            <TextInput
              className="bg-gray-100 border border-gray-300 p-4 rounded-md flex-1 ml-2 text-black"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View className="relative flex-row items-center mb-6">
            <Ionicons name="lock-closed-outline" size={24} color="gray" />
            <TextInput
              className="bg-gray-100 border border-gray-300 p-4 rounded-md flex-1 ml-2"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              className="absolute right-3 top-3 flex justify-center" // Adicionando flex para centralizar
              onPress={() => setShowPassword(!showPassword)}
              style={{ width: 60 }} // Definindo uma largura fixa para o botão
            >
              <Text className="text-gray-800 text-center my-2">
                {/* Centralizando o texto */}
                {showPassword ? "Ocultar" : "Mostrar"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-blue-600 p-4 rounded-md hover:bg-blue-700 transition duration-200 mb-6"
            onPress={handleLogin}
          >
            <Text className="text-center text-white font-bold">Login</Text>
          </TouchableOpacity>

          <View className="flex-row justify-between mb-4 space-x-4">
            <TouchableOpacity
              onPress={() => alert("Redirecionar para recuperação de senha")}
            >
              <View className="flex-row items-center">
                <Ionicons name="help-circle-outline" size={20} color="gray" />
                <Text className="text-gray-800 underline ml-1">
                  Esqueceu a senha?
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("Redirecionar para página de registro")}>
              <View className="flex-row items-center">
                <Ionicons name="person-add-outline" size={20} color="gray" />
                <Text className="text-gray-800 underline ml-1">
                  Cadastrar-se
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
