
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../components/dashboard";
import Login from "../components/login";

type RootStackParamList = {
  Login: undefined; // Adiciona "Login" aqui
  Dashboard: undefined; // Mantém "Dashboard" aqui
};


const Stack = createStackNavigator<RootStackParamList>();



export default function SistemaManutencao() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  );

  
  
}
