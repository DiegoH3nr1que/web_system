import { View, Text } from "react-native";

export function Footer() {
    return (
      <View className="w-full fixed bg-slate-200 p-4">
        <Text className="text-center text-black text-sm">
          Todos os direitos reservados &copy; 2024
        </Text>
      </View>
    );
  }