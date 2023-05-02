import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import * as Font from 'expo-font';
import { Octicons } from '@expo/vector-icons';
import { View } from 'react-native';

const SuccessRecupero = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);

  // Font propia
  const loadFontAsync = async () => {
    await Font.loadAsync({
      'BebasNeue': require('../assets/fonts/BebasNeue.ttf'),
    });
    setFontLoaded(true);
  }

  useEffect(() => {
    loadFontAsync();
  }, []);

  return (
    <Stack fill center spacing={4}>
      <Surface elevation={4} category="medium" style={{ justifyContent: "center", alignItems: "center", width: 600, height: 600 }}>

        <View style={{ margin: 10 }}>
          <Octicons name="verified" size={90} color="#24CAE8" />
        </View>
        <Text style={{ width: '80%', textAlign: 'center', fontFamily: fontLoaded ? 'BebasNeue' : 'Arial', fontSize: 30, color: 'green' }}>¡ Cambio de contraseña exitoso !</Text>
        <Button title="Loguearme" onPress={() => navigation.navigate("Login")} style={{ width: '80%', textAlign: 'center', maxWidth: "40%", minWidth: "30%", height: 50, display: 'flex', marginTop: 40, justifyContent: 'center' }} />

      </Surface>
    </Stack>
  );
}

export default SuccessRecupero;
