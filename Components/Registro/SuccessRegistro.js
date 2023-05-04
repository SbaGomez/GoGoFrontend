import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Font from 'expo-font';
import { Octicons } from '@expo/vector-icons';
import { View } from 'react-native';
import styles from '../Utils/Styles';

const Success = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [fontLoaded, setFontLoaded] = useState(false);

  // Font propia
  const loadFontAsync = async () => {
    await Font.loadAsync({
      'BebasNeue': require('../../assets/fonts/BebasNeue.ttf'),
    });
    setFontLoaded(true);
  }

  useEffect(() => {
    loadFontAsync();
  }, []);

  return (
    <Stack fill center spacing={4}>
      <Surface elevation={4} category="medium" style={styles.surfaceGeneral} >
        <View style={{ margin: 10 }}>
          <Octicons name="verified" size={90} color="#24CAE8" />
        </View>
        <Text style={styles.textExito}>¡ Registro exitoso !</Text>
        <Text style={styles.textTituloRegistro}>
          ¡Bienvenido/a, {route.params.nombre}!
        </Text>
        <Button title="Loguearme" onPress={() => navigation.navigate("Login")} style={styles.buttonExito} />

      </Surface>
    </Stack>
  );
}

export default Success;
