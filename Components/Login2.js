import React from "react";
import logoImage from '../assets/GOGO.png';
import { Surface, Stack, Button } from "@react-native-material/core";
import { Image } from 'react-native';
import { TextInput } from 'react-native-paper';

const Login2 = () => (
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
        <Image source={logoImage} style={{width: '100%', height: 150, maxWidth: 270, maxHeight: 150, marginBottom: 30}} />

        <TextInput label="Email" mode="outlined" placeholder="Email" right={<TextInput.Affix text="/50" />} style={{ width: '60%', height: 50, marginBottom: 15 , display: 'flex', justifyContent: 'center'}}/>
        <TextInput label="Contraseña" mode="outlined" placeholder="Contraseña" secureTextEntry right={<TextInput.Affix text="/15" />}  style={{ width: '60%', height: 50, marginBottom: 50 , display: 'flex', justifyContent: 'center'}}/>

        <Button title="Ingresar" style={{ width: '60%', height: 50, marginBottom: 15 , display: 'flex', justifyContent: 'center'}}/>
        <Button title="Registrarme" style={{ width: '60%', height: 50, display: 'flex', justifyContent: 'center' }}/>

    </Surface>
  </Stack>
);

export default Login2;