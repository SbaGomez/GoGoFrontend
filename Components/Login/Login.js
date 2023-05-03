import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import logoImage from '../../assets/GOGO.png';
import { View, Modal, Image } from 'react-native';
import axios from "axios";
import { TextInput } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import styles from '../Utils/Styles';
import * as Font from 'expo-font';

function Login() {
  const navigation = useNavigation();
  const [errores, setErrores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
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

  // Funcion para las validaciones
  const validarLogin = () => {
    let erroresTemp = [];

    if (!email) {
      erroresTemp.push('Por favor, ingrese su correo electrónico.');
    }

    if (!clave) {
      erroresTemp.push('Por favor, ingrese su contraseña.');
    }

    setErrores(erroresTemp);

    return erroresTemp;
  }

  // Funcion para saber cuando abrir el modal
  useEffect(() => {
    if (errores.length > 0) {
      setModalVisible(true);
    }
  }, [errores]);

  // Funcion login
  async function handleLogin(email, clave) {
    const errores = validarLogin();
    if (errores.length === 0) {
      try {
        const response = await axios.post('http://localhost:8282/auth/login', {
          email: email,
          clave: clave
        });
        const token = response.data;
        console.log(token);
        navigation.navigate('Home', { email: email });
      } catch (error) {
        if (error.response && error.response.data === "Email o contraseña incorrectos") {
          setErrores(["Email o contraseña incorrectos."]);
          setModalVisible(true);
        }
        console.error(error);
      }
    }
  }

  return (
    <Stack fill center spacing={4}>
      <Surface elevation={6} category="medium" style={{ justifyContent: "center", alignItems: "center", width: 600, height: 600 }}>

        <Image source={logoImage} style={styles.logo} />

        <TextInput label="Email" mode="outlined" placeholder="@uade.edu.ar" value={email} onChangeText={text => setEmail(text)} right={<TextInput.Affix text="/50" />} style={{ width: '80%', maxWidth: "60%", minWidth: "30%", height: 50, marginBottom: 15, display: 'flex', justifyContent: 'center' }} />
        <TextInput label="Contraseña" mode="outlined" placeholder="Contraseña" value={clave} onChangeText={text => setClave(text)} maxLength={15} secureTextEntry right={<TextInput.Affix text="/15" />} style={{ width: '80%', maxWidth: "60%", minWidth: "30%", height: 50, marginBottom: 50, display: 'flex', justifyContent: 'center' }} />

        <Button title="Ingresar" onPress={async () => await handleLogin(email, clave)} style={{ backgroundColor: '#24CAE8', width: '80%', textAlign: 'center', maxWidth: "60%", minWidth: "30%", height: 50, marginBottom: 15, display: 'flex', justifyContent: 'center' }} />
        <Button title="Registrarme" onPress={() => navigation.navigate("Registro")} style={{ width: '80%', textAlign: 'center', maxWidth: "60%", minWidth: "30%", height: 50, display: 'flex', justifyContent: 'center' }} />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '60%' }}>
          <Text category="h4" onPress={() => navigation.navigate("Recupero")} style={{ fontFamily: fontLoaded ? 'BebasNeue' : 'Arial', marginTop: 20, flex: 1, textAlign: 'right', color: '#696969' }}>Olvidaste tu contraseña ?</Text></View>

        <View style={styles.centeredView}>
          <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)} animationType="slide">
            <View style={styles.modalView}>
              {errores.map((error, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', height: 25, marginBottom: 20, justifyContent: 'center' }}>
                  <Feather name="x-octagon" size={22} color="#900" />
                  <Text style={{ fontFamily: fontLoaded ? 'BebasNeue' : 'Arial', fontSize: 18, color: 'black', marginTop: 4, marginLeft: 10 }}>{error}</Text>
                </View>
              ))}
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '80%', textAlign: 'center', maxWidth: "60%", minWidth: "30%", height: 60, display: 'flex', marginTop: 20, justifyContent: 'center' }}>
                  <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </View>
          </Modal>
        </View>

      </Surface>
    </Stack>
  );
}

export default Login;