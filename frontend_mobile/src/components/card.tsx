import React from "react";
import { View, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

interface CardInterface {
  color?: string;
  title?: string;
  reason?: string;
  text?: string;
  icon?: React.ReactNode;
}

export function Card({ color, title, text, reason, icon }: CardInterface) {
  return (
    <View
      className={`p-4 ml-3 flex flex-row items-center rounded-lg mb-3 shadow-md ${color || 'bg-white'}`}
    >
      <View className="flex-1">
        {title && (
          <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        )}
        {reason && <Text className="text-sm text-gray-600 mt-1">{reason}</Text>}
        {text && <Text className="text-sm text-gray-600 mt-1">{text}</Text>}
      </View>
      {icon && <View>{icon}</View>}
    </View>
  );
}
