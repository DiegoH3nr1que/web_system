import React from "react";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Card } from "./card";
import { Footer } from "./footer";
import TableComponent from "./table";

export default function Dashboard() {
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

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-slate-200">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-4">
          <Text className="text-center font-serif font-extrabold text-xl mb-10">
            SISTEMA DE GESTÃO DE MANUTENÇÃO
          </Text>

          {/* View ajustada para centralizar os cartões */}
          <View className="flex flex-wrap justify-center items-center gap-4">
            {cards.map((props, index) => (
              <Card
                key={index}
                color={props.color}
                title={props.title}
                text={props.text}
                icon={props.icon}
              />
            ))}
          </View>
          <TableComponent/>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}
