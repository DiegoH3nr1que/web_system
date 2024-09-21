import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  onNotificationPress: () => void;
  onUserPress: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onNotificationPress,
  onUserPress,
}) => {
  return (
    <View className="flex-row items-center justify-between my-8 px-5">
      <Text
        className="text-lg font-bold flex-wrap text-center"
        style={{ flex: 1 }}
      >
        SISTEMA DE GESTÃO DE MANUTENÇÃO
      </Text>
      <View className="flex-row">
        <TouchableOpacity onPress={onUserPress} style={{ marginRight: 20 }}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNotificationPress}>
          <Ionicons name="notifications-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
