import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from  "@react-navigation/native";
import {Feather} from '@expo/vector-icons'; 

//screens
import LoginScreen from "./Login";
import RegistroScreen from "./Registro";


const Tab = createBottomTabNavigator();

function Navegation() {
  return (
    <Tab.Navigator initialRoutName="Login" screenOptions={{ tabBarActiveBackgroundColor: '#fff' }}>
      <Tab.Screen name="Login" component={LoginScreen} 
        options={{ 
          tabBarLabel: 'Loguearme', 
          tabBarIcon: ({ color, size }) => (<Feather name="user" size={24} color="black" />), 
          }}
      />
      <Tab.Screen name="Registro" component={RegistroScreen} 
        options={{ 
          tabBarLabel: 'Registrarme', 
          tabBarIcon: ({ color, size }) => (<Feather name="user-plus" size={24} color="black" />), 
          headerBackTitleVisible: false,  
        }}
      />
    </Tab.Navigator>
  );
}

export default function GoGo3() {
  return (
    <NavigationContainer>
      <Navegation />
    </NavigationContainer>
  );
}