import React, { useState, useEffect } from "react";
import { Surface, Stack, Text } from "@react-native-material/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Font from 'expo-font';
import styles from './Utils/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home() {
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
    <Stack flex={1} center spacing={4} direction="column">
      <Surface elevation={4} category="medium" style={styles.surfaceViajes}>
      </Surface>
      <Surface elevation={4} category="medium" style={styles.surfaceViajes}>
      </Surface>
      <Surface elevation={4} category="medium" style={styles.surfaceViajes}>
      </Surface>
      <Surface elevation={4} category="medium" style={styles.surfaceViajes}>
      </Surface>
    </Stack>
  );
}

export default Home;
