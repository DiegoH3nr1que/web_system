import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="team" />
      <Stack.Screen name="machine" />
      <Stack.Screen name="maintenance" />
      <Stack.Screen name="maintenanceParts" />
    </Stack>
  );
}
