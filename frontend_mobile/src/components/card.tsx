import React, { useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

interface CardInterface {
  color?: string;
  title?: string;
  reason?: string;
  text?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

export function Card({ color, title, text, reason, icon, onPress }: CardInterface) {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={{ marginBottom: 12 }}
    >
      <Animated.View
        style={[animatedStyle]}
        className={`flex-row justify-around items-center p-2 rounded-lg ${color || 'bg-white'}`}
      >
        {title && (
          <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        )}
        {reason && <Text className="text-sm text-gray-600 mt-1">{reason}</Text>}
        {text && <Text className="text-sm text-gray-600 mt-1">{text}</Text>}
        {icon && <View>{icon}</View>}
      </Animated.View>
    </Pressable>
  );
}
