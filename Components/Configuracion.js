import React from "react";
import { Surface, Stack, Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import styles from './Utils/Styles';

function Configuracion() {
  const navigation = useNavigation();
  return (
    <Stack fill center spacing={4}>
      <Surface elevation={4} category="medium" style={styles.surfaceGeneral} >
        <Button title="Loguearme" onPress={() => navigation.navigate("Login")} style={{ width: '80%', textAlign: 'center', maxWidth: "40%", minWidth: "30%", height: 50, display: 'flex', marginTop: 40, justifyContent: 'center' }} />
      </Surface>
    </Stack>
  );
}

export default Configuracion;
