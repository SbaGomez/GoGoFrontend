import React from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Octicons } from '@expo/vector-icons';
import { View } from 'react-native';

function Configuracion() {
  const navigation = useNavigation();
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
        <Text style={{ fontFamily: 'BebasNeue', fontSize: 30, color: 'black' }}>Te registraste correctamente !</Text>
        <Button title="Loguearme" onPress={() => navigation.navigate("Login")} style={{ width: '60%', height: 50, display: 'flex', marginTop: 40, justifyContent: 'center' }} />

      </Surface>
    </Stack>
  );
}

export default Configuracion;
