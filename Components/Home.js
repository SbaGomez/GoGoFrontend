import React, { useState, useEffect } from "react";
import { Surface, Stack, Text } from "@react-native-material/core";
import { useRoute } from "@react-navigation/native";
import * as Font from 'expo-font';

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
      <Surface elevation={4} category="medium" style={{ justifyContent: "center", alignItems: "center", width: 600, height: 600, }}>
        <Text category="h4" style={{ width: '65%', textAlign: 'center', fontFamily: fontLoaded ? 'BebasNeue' : 'Arial', fontSize: 30, marginTop: 20, maxWidth: "65%" }}>
          Bienvenido, {route.params.email} !
        </Text>

      </Surface>
    </Stack>
  );
}

export default Home;
