import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Feather, Entypo } from '@expo/vector-icons';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

//screens
import LoginScreen from "./Login";
import RegistroScreen from "./Registro";
import ConfiguracionScreen from "./Configuracion";
import SuccessScreen from "./Success";
import AlertasScreen from "./Alertas";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabNav" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Alertas" component={AlertasScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const navigation = useNavigation();
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome name="arrow-left" size={30} color="#474545" style={{ marginLeft: 15, height: 64, lineHeight: 64 }} />
            </TouchableOpacity>
          )
        }}
      />
      <Tab.Screen name="Registro" component={RegistroScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabelStyle: { color: '#ccc' },
          tabBarIcon: ({ color, size }) => (<Feather name="user-plus" size={26} color="white" />),
          headerShown: true,
          headerBackTitleVisible: false,
          headerBackVisible: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome name="arrow-left" size={30} color="#474545" style={{ marginLeft: 15, height: 64, lineHeight: 64 }} />
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
