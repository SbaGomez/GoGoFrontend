import React from "react";
import { Surface, Stack, Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";

function Success() {
  const navigation = useNavigation();
  return (
    <Stack fill center spacing={4}>
      <Surface elevation={4} category="medium" style={{ justifyContent: "center", alignItems: "center", width: 600, height: 600, }} >
        <Button title="Loguearme" onPress={() => navigation.navigate("Login")} style={{ width: '60%', height: 50, display: 'flex', marginTop: 30, justifyContent: 'center' }} />
      </Surface>
    </Stack>
  );
}

export default Success;
