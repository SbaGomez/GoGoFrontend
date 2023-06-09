import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../Utils/Styles';
import * as Font from 'expo-font';

function Recupero() {
  const [baseURL] = useState("http://192.168.1.5:8282")
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  const [errores, setErrores] = useState([]);
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [codigo, setCode] = useState('');
  const [tipoEmail, setTipoEmail] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

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

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const uadeEmailPattern = /@uade\.edu\.ar$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;

  // Funcion para las validaciones
  const validar = async () => {
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
    const errores = await validar();
    if (errores.length === 0) {
      try {
        setTipoEmail(1);
        const response = await axios.post(baseURL + '/recupero/validarMail', {
          email, tipoEmail
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
    const errores = await validar();
    if (errores.length !== 0) return;

    try {
      const response = await axios.post(baseURL + '/recupero/updateClave', {
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
      <Surface elevation={4} category="medium" style={styles.surfaceGeneral} >

        <View style={styles.surfaceGeneral}>
          {!mostrarCodigo ? (
            <>
              <Text style={styles.textTituloRecupero}>
                Ingrese el mail de la cuenta a recuperar.
              </Text>
              <TextInput label="Email" mode="outlined" placeholder="@uade.edu.ar" value={email} onChangeText={text => setEmail(text)} maxLength={30} right={<TextInput.Affix text="/30" />} style={styles.textInputRecupero} />
              <Button title="Recuperar contraseña" onPress={async () => await handleValidar(email)} style={styles.buttonRecupero} />
            </>
          ) : (
            <View onSubmit={handleUpdate} style={styles.viewIngreseCodigo}>

              <Text style={styles.textTituloRecupero}>
                Verifique su casilla de correo electronico e ingrese el codigo.
              </Text>

              <TextInput label="Ingrese el código" mode="outlined" placeholder="Código de recuperación" value={codigo} onChangeText={text => setCode(text)} maxLength={6} right={<TextInput.Affix text="/6" />} style={styles.textInputRecupero} />
              <View style={styles.container}>
                <View style={styles.textInputContainer}>
                  <TextInput
                    label="Contraseña"
                    mode="outlined"
                    placeholder="Contraseña"
                    value={clave}
                    onChangeText={text => setClave(text)}
                    maxLength={15}
                    right={<TextInput.Affix text="/15" />}
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
              <Button title="Cambiar contraseña" onPress={async () => await handleUpdate(codigo, clave)} style={styles.buttonRecupero} />
              <Button title="Reenviar email" onPress={handleReenviar} style={styles.buttonRecuperoReenviar} />

            </View>
          )}
        </View>

        <View style={styles.centeredView}>
          <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)} animationType="slide">
            <View style={styles.modalView}>
              {errores.map((error, index) => (
                <View key={index} style={styles.viewModalText}>
                  <Feather name="x-octagon" size={22} color="#900" />
                  <Text style={styles.textModalError}>{error}</Text>
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

export default Recupero;
