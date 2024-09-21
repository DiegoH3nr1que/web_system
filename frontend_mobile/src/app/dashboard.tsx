import React from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Card } from "../components/card";
import { Footer } from "../components/footer";
import TableComponent from "../components/table";
import Header from "../components/header";
import { router } from 'expo-router';

export default function DashboardScreen() {
  const cards = [
    {
      color: "border bg-background",
      title: "Ambientes",
      text: "Ambientes",
      icon: <Ionicons name="home-outline" size={48} color="black" />,
    },
    {
      color: "border bg-background",
      title: "Equipamentos",
      text: "Equipamentos",
      icon: <Feather name="cpu" size={48} color="black" />,
      onPress: () => router.push('/equipament'),
    },
    {
      color: "border bg-background",
      title: "O.S. Alertas",
      text: "O.S. Alertas",
      icon: <Ionicons name="alert-circle-outline" size={48} color="black" />,
    },
    {
      color: "border bg-background",
      title: "O.S. Concluídas",
      text: "O.S. Concluídas",
      icon: <Feather name="check-circle" size={48} color="black" />,
    },
  ];

  const handleNotificationPress = () => {
    console.log("Notificações pressionadas!");
  };

  const handleUserPress = () => {
    console.log("Usuário pressionado!");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-slate-200">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header onNotificationPress={handleNotificationPress} onUserPress={handleUserPress} />
        <View className="p-4">
          {cards.map((props, index) => (
            <Card
              key={index}
              color={props.color}
              title={props.title}
              text={props.text}
              icon={props.icon}
              onPress={props.onPress}
            />
          ))}
          <TableComponent />
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}