import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

//screens
import LoginScreen from "./Login";
import RegistroScreen from "./Registro";
import ConfiguracionScreen from "./Configuracion";


const Tab = createBottomTabNavigator();

function Navegation() {
  return (
    <Tab.Navigator initialRoutName="Login" screenOptions={{ tabBarActiveBackgroundColor: '#680AEF', tabBarInactiveBackgroundColor: '#680AEF' }}>
      <Tab.Screen name="Login" component={LoginScreen}
        options={{
          tabBarLabel: 'Loguearme',
          tabBarShowLabel: false,
          tabBarLabelStyle: { color: '#ccc' },
          tabBarIcon: ({ color, size }) => (<Feather name="user" size={26} color="white" />),
          headerShown: true,
        }}
      />
      <Tab.Screen name="Config" component={ConfiguracionScreen}
        options={{
          tabBarLabel: 'Configuracion',
          tabBarShowLabel: false,
          tabBarLabelStyle: { color: '#ccc' },
          tabBarIcon: ({ color, size }) => (<AntDesign name="setting" size={26} color="white" />),
          headerShown: true,
        }}
      />
      <Tab.Screen name="Registro" component={RegistroScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabelStyle: { color: '#ccc' },
          tabBarIcon: ({ color, size }) => (<Feather name="user-plus" size={26} color="white" />),
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default function GoGo() {
  return (
    <NavigationContainer>
      <Navegation />
    </NavigationContainer>
  );
}