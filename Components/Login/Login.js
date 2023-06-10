import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import logoImage from '../../assets/GOGO.png';
import { View, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { TextInput } from 'react-native-paper';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import styles from '../Utils/Styles';
import * as Font from 'expo-font';

function Login() {
  const [baseURL, setBaseURL] = useState('');
  const navigation = useNavigation();
  const [errores, setErrores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  //Obtener baseURL
  useEffect(() => {
    async function obtenerBaseURL() {
      try {
        const baseURL = await AsyncStorage.getItem("baseURL");
        if (baseURL !== null) {
          // Aquí puedes utilizar el valor de baseURL
          setBaseURL(baseURL);
        }
      } catch (error) {
        console.error(error);
      }
    }

    obtenerBaseURL();
  }, []);

  //Funcion para Ocultar/Mostrar Password
  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  }

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

  const textOlvideClave = fontLoaded ? { fontFamily: 'BebasNeue', fontSize: 18, marginTop: 20, flex: 1, textAlign: 'right', color: '#696969' } : {};
  const textModalError = fontLoaded ? { fontFamily: 'BebasNeue', fontSize: 18, color: 'black', marginTop: 4, marginLeft: 10 } : {};

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
        const response = await axios.post(baseURL + '/auth/login', {
          email: email,
          clave: clave
        });
        const token = response.data;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("email", email);
        navigation.navigate('Perfil', { email: email });
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
      <Surface elevation={6} category="medium" style={styles.surfaceGeneral}>

        <Image source={logoImage} style={styles.logo} />

        <TextInput label="Email" mode="outlined" placeholder="@uade.edu.ar" value={email} onChangeText={text => setEmail(text)} maxLength={30} right={<TextInput.Affix text="/30" />} style={styles.textInputLogin} />
        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <TextInput
              label="Contraseña"
              mode="outlined"
              placeholder="Contraseña"
              value={clave}
              onChangeText={text => setClave(text)}
              maxLength={15}
              right={<TextInput.Affix style={styles.rightText} text="/15" />}
              secureTextEntry={!showPassword}
              style={styles.textInputPasswordLogin}
            />
            <TouchableWithoutFeedback onPress={toggleShowPassword}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                style={showPassword ? styles.iconEyeOff : styles.iconEyeOn}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <Button title="Ingresar" onPress={async () => await handleLogin(email, clave)} style={styles.buttonLogin} />
        <Button title="Registrarme" onPress={() => navigation.navigate("Registro")} style={styles.buttonLoginRegistrarme} />

        <View style={styles.viewOlvideClave}>
          <Text onPress={() => navigation.navigate("Recupero")} style={textOlvideClave}>Olvidaste tu contraseña ?</Text>
        </View>

        <View style={styles.centeredView}>
          <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)} animationType="slide">
            <View style={styles.modalView}>
              {errores.map((error, index) => (
                <View key={index} style={styles.viewModalText}>
                  <Feather name="x-octagon" size={22} color="#900" />
                  <Text style={textModalError}>{error}</Text>
                </View>
              ))}
              <View style={styles.viewModalButton}>
                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>

      </Surface>
    </Stack>
  );
}

export default Login;