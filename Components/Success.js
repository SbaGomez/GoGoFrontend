import React from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Octicons } from '@expo/vector-icons';
import { View } from 'react-native';

const Success = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let [fontsLoaded] = useFonts({
    "BebasNeue": require('../assets/fonts/BebasNeue.ttf'),
  })

  return (
    <Stack fill center spacing={4}>
      <Surface
        elevation={4}
        category="medium"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 600,
          height: 600,
        }}
      >
        <View style={{ margin: 10 }}>
          <Octicons name="verified" size={90} color="#24CAE8" />
        </View>
        <Text style={{ width: '80%', textAlign: 'center', fontFamily: 'BebasNeue', fontSize: 30, color: 'green' }}>¡ Registro exitoso !</Text>
        <Text category="h4" style={{ width: '80%', textAlign: 'center', fontFamily: 'BebasNeue', fontSize: 30, marginTop: 20 }}>
          ¡Bienvenido/a, {route.params.nombre}!
        </Text>
        <Text category="h4" style={{ width: '70%', textAlign: 'center', fontFamily: 'BebasNeue', fontSize: 30, marginTop: 20, maxWidth: "70%" }}>
          Verifique su casilla de correo para confirmar la cuenta.
        </Text>
        <Button title="Loguearme" onPress={() => navigation.navigate("Login")} style={{ width: '80%', textAlign: 'center', maxWidth: "40%", minWidth: "30%", height: 50, display: 'flex', marginTop: 40, justifyContent: 'center' }} />

      </Surface>
    </Stack>
  );
}

export default Success;
