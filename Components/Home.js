import React, { useState, useEffect } from "react";
import { Surface, Stack, Text } from "@react-native-material/core";
import { useRoute } from "@react-navigation/native";
import * as Font from 'expo-font';
import styles from './Utils/Styles';

function Home() {
  const route = useRoute();
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
      <Surface elevation={4} category="medium" style={styles.surfaceGeneral}>
        <Text style={styles.titulo}>
          Bienvenido, {route.params.email} !
        </Text>

      </Surface>
    </Stack>
  );
}

export default Home;
