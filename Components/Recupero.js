import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-paper';
import axios from "axios";
import * as Font from 'expo-font';

function Recupero() {
  const navigation = useNavigation();
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
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

  const handleRecuperar = () => {
    // Lógica para enviar el correo de recuperación y obtener el código
    setMostrarCodigo(true);
  }

  const handleCodigo = () => {
    // Lógica cuando ingresas el codigo
  }

  const handleReenviar = () => {
    setMostrarCodigo(false);
  }

  return (
    <Stack fill center spacing={4}>
      <Surface
        elevation={4}
        category="medium"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 600,
          height: 600,
        }}
      >
        {!mostrarCodigo ? (
          <>
            <Text category="h4" style={{ width: '65%', textAlign: 'center', fontFamily: fontLoaded ? 'BebasNeue' : 'Arial', fontSize: 30, marginBottom: 20, maxWidth: "65%" }}>
              Ingrese el mail de la cuenta a recuperar.
            </Text>
            <TextInput label="Email" mode="outlined" placeholder="@uade.edu.ar" right={<TextInput.Affix text="/50" />} style={{ width: '80%', maxWidth: "60%", minWidth: "30%", height: 50, marginBottom: 15, display: 'flex', justifyContent: 'center' }} />
            <Button title="Recuperar contraseña" style={{ backgroundColor: '#24CAE8', width: '80%', textAlign: 'center', maxWidth: "50%", minWidth: "40%", height: 50, display: 'flex', marginTop: 40, justifyContent: 'center' }} onPress={handleRecuperar} />
          </>
        ) : (
          <>
            <Text category="h4" style={{ width: '65%', textAlign: 'center', fontFamily: fontLoaded ? 'BebasNeue' : 'Arial', fontSize: 30, marginBottom: 20, maxWidth: "65%" }}>
              Verifique su casilla de correo electronico e ingrese el codigo.
            </Text>
            <TextInput label="Ingrese el código" mode="outlined" placeholder="Código de recuperación" maxLength={6} right={<TextInput.Affix text="/6" />} style={{ width: '80%', maxWidth: "60%", minWidth: "30%", height: 50, marginBottom: 15, display: 'flex', justifyContent: 'center' }} />
            <TextInput label="Nueva contraseña" mode="outlined" placeholder="Contraseña" maxLength={15} secureTextEntry right={<TextInput.Affix text="/15" />} style={{ width: '80%', maxWidth: "60%", minWidth: "30%", height: 50, marginBottom: 15, display: 'flex', justifyContent: 'center' }} />
            <Button title="Cambiar contraseña" style={{ backgroundColor: '#24CAE8', width: '80%', textAlign: 'center', maxWidth: "40%", minWidth: "30%", height: 50, display: 'flex', marginTop: 40, justifyContent: 'center' }} onPress={handleCodigo} />
            <Button title="Reenviar email" style={{ width: '80%', textAlign: 'center', maxWidth: "40%", minWidth: "30%", height: 50, display: 'flex', marginTop: 20, justifyContent: 'center' }} onPress={handleReenviar} />
          </>
        )}
      </Surface>
    </Stack>
  );
}

export default Recupero;
