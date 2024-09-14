import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Footer } from "./footer";

export default function Login({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      navigation.navigate("Dashboard");
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }} className="bg-slate-200">
      <View className="flex-1 justify-center p-6">
        <View className="rounded-lg bg-slate-500 p-10">
          <Text className="text-center font-serif font-extrabold text-2xl mb-6">
            Sistema de Manutenção
          </Text>
          <Text className="text-center font-serif font-extrabold mb-2">
            USUÁRIO
          </Text>
          <TextInput
            className="bg-white p-4 rounded-md mb-4 text-black"
            placeholder="Digite seu nome de usuário"
            value={username}
            onChangeText={setUsername}
          />
          <Text className="text-center font-serif font-extrabold mb-2">
            SENHA
          </Text>
          <TextInput
            className="bg-white p-4 rounded-md mb-6"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded-md"
            onPress={handleLogin}
          >
            <Text className="text-center text-white font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
