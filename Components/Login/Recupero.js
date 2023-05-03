import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { View, Modal } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Feather } from '@expo/vector-icons';
import styles from '../Utils/Styles';
import * as Font from 'expo-font';

function Recupero() {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  const [errores, setErrores] = useState([]);
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [codigo, setCode] = useState('');

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

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const uadeEmailPattern = /@uade\.edu\.ar$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;

  // Funcion para las validaciones
  const validar = () => {
    let erroresTemp = [];

    if (!email) {
      erroresTemp.push('Por favor, ingrese su correo electrónico.');
    } else {
      if (!pattern.test(email) || !uadeEmailPattern.test(email)) {
        erroresTemp.push('El correo electrónico no es válido o no pertenece a UADE');
      }
    }

    if (mostrarCodigo == true) {
      if (!codigo) {
        erroresTemp.push('Por favor, ingrese el codigo de verificacion.');
      }

      if (!clave) {
        erroresTemp.push('Por favor, ingrese su contraseña.');
      } else {
        if (clave.length < 8 || clave.length > 15) {
          erroresTemp.push('La contraseña debe tener entre 8 y 15 caracteres.');
        }
        else {
          if (!passwordRegex.test(clave)) {
            erroresTemp.push('La contraseña debe tener al menos una letra mayúscula, al menos un número y al menos un carácter especial.');
          }
        }
      }
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

  //Funcion validar Mail
  async function handleValidar(email) {
    const errores = validar();
    if (errores.length === 0) {
      try {
        const response = await axios.post('http://localhost:8282/recupero/validarMail', {
          email
        });
        setMostrarCodigo(true);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.data === "Email no registrado") {
          setErrores(["El email ingresado no existe."]);
          setModalVisible(true);
        }
        console.error(error);
      }

    }
  }

  //Funcion Update clave
  async function handleUpdate(codigo, clave) {
    const errores = validar();
    if (errores.length !== 0) return;

    try {
      const response = await axios.post('http://localhost:8282/recupero/updateClave', {
        codigo, clave
      });
      navigation.navigate("SuccessRecupero");
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data === "Código inválido") {
        setErrores(["El codigo ingresado es invalido."]);
        setModalVisible(true);
      }
      console.error(error);
    }
  }

  const handleReenviar = () => {
    setMostrarCodigo(false);
  }

  return (
    <Stack fill center spacing={4}>
      <Surface elevation={4} category="medium" style={{ justifyContent: "center", alignItems: "center", width: 600, height: 600 }} >

        <View style={{ justifyContent: "center", alignItems: "center", width: 600, height: 600 }}>
          {!mostrarCodigo ? (
            <>
              <Text category="h4" style={{ width: '65%', textAlign: 'center', fontFamily: fontLoaded ? 'BebasNeue' : 'Arial', fontSize: 30, marginBottom: 20, maxWidth: "65%" }}>
                Ingrese el mail de la cuenta a recuperar.
              </Text>
              <TextInput label="Email" mode="outlined" placeholder="@uade.edu.ar" value={email} onChangeText={text => setEmail(text)} right={<TextInput.Affix text="/50" />} style={{ width: '80%', maxWidth: "60%", minWidth: "30%", height: 50, marginBottom: 15, display: 'flex', justifyContent: 'center' }} />
              <Button title="Recuperar contraseña" onPress={async () => await handleValidar(email)} style={{ backgroundColor: '#24CAE8', width: '80%', textAlign: 'center', maxWidth: "50%", minWidth: "40%", height: 50, display: 'flex', marginTop: 40, justifyContent: 'center' }} />
            </>
          ) : (
            <View onSubmit={handleUpdate} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, flexDirection: 'column', width: '100%' }}>

              <Text category="h4" style={{ width: '65%', textAlign: 'center', fontFamily: fontLoaded ? 'BebasNeue' : 'Arial', fontSize: 30, marginBottom: 20, maxWidth: "65%" }}>
                Verifique su casilla de correo electronico e ingrese el codigo.
              </Text>

              <TextInput label="Ingrese el código" mode="outlined" placeholder="Código de recuperación" value={codigo} onChangeText={text => setCode(text)} maxLength={6} right={<TextInput.Affix text="/6" />} style={{ width: '80%', maxWidth: "60%", minWidth: "30%", height: 50, marginBottom: 15, display: 'flex', justifyContent: 'center' }} />
              <TextInput label="Nueva contraseña" mode="outlined" placeholder="Contraseña" value={clave} onChangeText={text => setClave(text)} maxLength={15} secureTextEntry right={<TextInput.Affix text="/15" />} style={{ width: '80%', maxWidth: "60%", minWidth: "30%", height: 50, marginBottom: 15, display: 'flex', justifyContent: 'center' }} />
              <Button title="Cambiar contraseña" onPress={async () => await handleUpdate(codigo, clave)} style={{ backgroundColor: '#24CAE8', width: '80%', textAlign: 'center', maxWidth: "40%", minWidth: "30%", height: 50, display: 'flex', marginTop: 40, justifyContent: 'center' }} />
              <Button title="Reenviar email" onPress={handleReenviar} style={{ width: '80%', textAlign: 'center', maxWidth: "40%", minWidth: "30%", height: 50, display: 'flex', marginTop: 20, justifyContent: 'center' }} />
            </View>
          )}
        </View>

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

export default Recupero;
