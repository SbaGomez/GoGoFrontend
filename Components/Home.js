import React, { useState, useEffect } from "react";
import { Surface, Stack, Text } from "@react-native-material/core";
import { ScrollView } from 'react-native';
import * as Font from 'expo-font';
import styles from './Utils/Styles';


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

    <ScrollView>
      <Stack flex={1} center spacing={4} direction="column">
        <Surface elevation={4} category="medium" style={styles.surfaceViajes}>
          <Text style={styles.titulo}>HOME COMMING SOON</Text>
        </Surface>
      </Stack>
    </ScrollView>
  );
}

export default Home;
