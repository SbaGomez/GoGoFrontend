import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Feather, Entypo } from '@expo/vector-icons';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

//screens
import LoginScreen from "./Login/Login";
import RegistroScreen from "./Registro/Registro";
import ConfiguracionScreen from "./Configuracion";
import AlertasScreen from "./Alertas";
import HomeScreen from "./Home";
import RecuperoScreen from "./Login/Recupero";
import SuccessRegistroScreen from "./Registro/SuccessRegistro";
import SuccessRecuperoScreen from "./Login/SuccessRecupero";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="TabNav" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: true }} />
      <Stack.Screen name="SuccessRegistro" component={SuccessRegistroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Recupero" component={RecuperoScreen} options={{
        headerShown: true,
        headerTitle: "Recuperar contraseña",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginLeft: 15, lineHeight: 64 }}>
            <FontAwesome name="arrow-left" size={30} color="#474545" />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="SuccessRecupero" component={SuccessRecuperoScreen} options={{
        headerShown: true,
        headerTitle: "Recuperar contraseña",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginLeft: 15, lineHeight: 64 }}>
            <FontAwesome name="arrow-left" size={30} color="#474545" />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="Alertas" component={AlertasScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  return (
    <Tab.Navigator initialRoutName="Login" screenOptions={{ tabBarActiveBackgroundColor: '#680AEF', tabBarInactiveBackgroundColor: '#680AEF' }}>
      <Tab.Screen name="Login" component={LoginScreen}
        options={{
          tabBarLabel: 'Loguearme',
          tabBarShowLabel: false,
          tabBarLabelStyle: { color: '#ccc' },
          tabBarIcon: ({ color, size }) => (<Feather name="user" size={26} color="white" />),
          headerShown: true,
          headerLeft: () => (
            <Entypo name="home" size={30} color="#474545" style={{ marginLeft: 15, height: 64, lineHeight: 64 }} />
          )
        }}
      />
      <Tab.Screen name="Config" component={ConfiguracionScreen}
        options={{
          tabBarLabel: 'Configuracion',
          tabBarShowLabel: false,
          tabBarLabelStyle: { color: '#ccc' },
          tabBarIcon: ({ color, size }) => (<AntDesign name="setting" size={26} color="white" />),
          headerShown: true,
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerLeft: () => (
            <TouchableOpacity onPress={goBack} style={{ marginTop: 25, marginLeft: 15, height: 100, height: 64, lineHeight: 64 }}>
              <FontAwesome name="arrow-left" size={30} color="#474545" />
            </TouchableOpacity>
          )
        }}
      />
      <Tab.Screen name="Registro" component={RegistroScreen}
        options={{
          tabBarLabel: 'Registro',
          tabBarShowLabel: false,
          tabBarLabelStyle: { color: '#ccc' },
          tabBarIcon: ({ color, size }) => (<Feather name="user-plus" size={26} color="white" />),
          headerShown: true,
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerLeft: () => (
            <TouchableOpacity onPress={goBack} style={{ marginTop: 25, marginLeft: 15, height: 64,  lineHeight: 64 }}>
              <FontAwesome name="arrow-left" size={30} color="#474545" />
            </TouchableOpacity>
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function GoGo() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
