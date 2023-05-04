import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import * as Font from 'expo-font';
import { Octicons } from '@expo/vector-icons';
import { View } from 'react-native';
import styles from '../Utils/Styles';

const SuccessRecupero = () => {
  const navigation = useNavigation();
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
      <Surface elevation={4} category="medium" style={styles.surfaceGeneral}>

        <View style={{ margin: 10 }}>
          <Octicons name="verified" size={90} color="#24CAE8" />
        </View>
        <Text style={styles.textExito}>¡ Cambio de contraseña exitoso !</Text>
        <Button title="Loguearme" onPress={() => navigation.navigate("Login")} style={styles.buttonVolverLogin} />

      </Surface>
    </Stack>
  );
}

export default SuccessRecupero;
