import React from "react";
import { Surface, Stack, Text } from "@react-native-material/core";
import { useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";

function Home() {
  const route = useRoute();
  let [fontsLoaded] = useFonts({
    "BebasNeue": require('../assets/fonts/BebasNeue.ttf'),
  })
  return (
    <Stack fill center spacing={4}>
      <Surface elevation={4} category="medium" style={{ justifyContent: "center", alignItems: "center", width: 600, height: 600, }}>

        <Text category="h4" style={{ width: '65%', textAlign: 'center', fontFamily: 'BebasNeue', fontSize: 30, marginTop: 20, maxWidth: "65%" }}>
          Bienvenido, {route.params.email} !
        </Text>

      </Surface>
    </Stack>
  );
}

export default Home;
