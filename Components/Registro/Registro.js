import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Divider, Text } from "@react-native-material/core";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Modal, ScrollView, Switch, TouchableWithoutFeedback } from 'react-native';
import axios from "axios";
import { FontAwesome, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import styles from '../Utils/Styles';

function Registro() {
  const [baseURL, setBaseURL] = useState('');
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  const [errores, setErrores] = useState([]);
  const [tipoEmail, setTipoEmail] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  //Obtener baseURL
  useEffect(() => {
    async function obtenerBaseURL() {
      try {
        const baseURL = await AsyncStorage.getItem("baseURL");
        if (baseURL !== null) {
          // Aquí puedes utilizar el valor de baseURL
          console.log(baseURL);
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

  // variables registro
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [dni, setDni] = useState("");
  const [clave, setClave] = useState("");
  const [sexo, setSexo] = useState("");
  const [codigo, setCode] = useState('');

  const handleSexoChange = (value) => {
    setSexo(value);
  };

  // Variables de regex para las validaciones
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const uadeEmailPattern = /@uade\.edu\.ar$/;
  const nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
  const dniRegex = /^[0-9]{8}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;
  const edadMinima = 17;
  const edadMaxima = 99;

  // Funciones para ver si existe el mail y el dni

  const validarEmail = async (email) => {
    try {
      const response = await axios.post(baseURL + '/user/emailExists', { email: email });
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const validarDni = async (dni) => {
    try {
      const response = await axios.post(baseURL + '/user/dniExists', { dni: dni });
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Funcion para las validaciones
  const validarFormulario = async () => {
    let erroresTemp = [];
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

    if (!email) {
      erroresTemp.push('Por favor, ingrese su correo electrónico.');
    } else {
      if (!pattern.test(email) || !uadeEmailPattern.test(email)) {
        erroresTemp.push('El correo electrónico no es válido o no pertenece a UADE');
      } else {
        const emailExiste = await validarEmail(email);
        if (emailExiste) {
          erroresTemp.push('El correo electrónico ya está registrado');
        }
      }
    }

    if (!nombre) {
      erroresTemp.push('Por favor, ingrese su nombre.');
    } else {
      if (!nameRegex.test(nombre)) {
        erroresTemp.push('Por favor, ingrese un nombre válido.');
      }
    }

    if (!apellido) {
      erroresTemp.push('Por favor, ingrese su apellido.');
    } else {
      if (!nameRegex.test(apellido)) {
        erroresTemp.push('Por favor, ingrese un apellido válido.');
      }
    }

    if (!edad) {
      erroresTemp.push('Por favor, ingrese su edad.');
    } else {
      if (isNaN(edad)) {
        erroresTemp.push('Por favor, ingrese un número válido para la edad.');
      } else if (parseInt(edad) < edadMinima || parseInt(edad) > edadMaxima) {
        erroresTemp.push(`Por favor, ingrese una edad válida entre ${edadMinima} y ${edadMaxima} años.`);
      }
    }

    if (!dni) {
      erroresTemp.push('Por favor, ingrese su DNI.');
    } else {
      if (!dniRegex.test(dni)) {
        erroresTemp.push('Por favor, ingrese un DNI válido (8 dígitos numéricos).');
      } else {
        const dniExiste = await validarDni(dni);
        if (dniExiste) {
          erroresTemp.push('El DNI ya está registrado');
        }
      }
    }

    if (!sexo) {
      erroresTemp.push('Por favor, seleccione su sexo.');
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

  // el submit para hacer el registro del usuario
  const handleSubmit = async (event) => {
    event.preventDefault();

    const erroresFormulario = await validarFormulario();
    console.log(erroresFormulario);
    if (erroresFormulario.length == 0) {
      try {
        setTipoEmail(0);
        setMostrarCodigo(true);
        const response = await axios.post(baseURL + "/user/addUser", {
          email, nombre, apellido, edad, dni, clave, sexo, tipoEmail
        });
        // Aquí puedes hacer algo después de que se ha registrado el usuario
        console.log(response.data);
        // Reiniciamos los estados
        setEmail(""); setNombre(""); setApellido(""); setEdad(""); setDni(""); setClave(""); setSexo(""); setErrores([]);
      } catch (error) {
        // Aquí puedes manejar el error
        console.error(error);
        console.log("error registro 02");
      }
    } else {
      // Aquí puedes mostrar los errores al usuario o hacer algo en caso de que existan
      console.log("error registro 01");
    }
  };

  //Funcion Update clave
  async function handleVerificar(codigo) {

    const erroresFormulario = await validarFormulario();
    if (erroresFormulario.length !== 0) return;

    try {
      const response = await axios.post(baseURL + '/user/verificarCodigo', {
        codigo
      });
      console.log(response.data);
      navigation.navigate("SuccessRegistro", { nombre: nombre });
    } catch (error) {
      if (error.response && error.response.data === "Código inválido") {
        setErrores(["El codigo ingresado es invalido."]);
        setModalVisible(true);
      }
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <Stack fill center spacing={4}>
        <Surface elevation={6} category="medium" style={{ justifyContent: "center", alignItems: "center", width: 600, height: 700, marginTop: 50, marginBottom: 50 }}>

          <View style={styles.viewRegistroTotal}>
            {!mostrarCodigo ? (
              <>
                <View onSubmit={handleSubmit} style={styles.viewRegistro}>

                  <TextInput name="email" label="Email" mode="outlined" value={email} maxLength={30} onChangeText={setEmail} right={<TextInput.Affix text="/30" />} style={styles.textInputRegistro} />
                  <TextInput name="nombre" label="Nombre" mode="outlined" maxLength={15} value={nombre} onChangeText={setNombre} right={<TextInput.Affix text="/15" />} style={styles.textInputRegistro} />
                  <TextInput name="apellido" label="Apellido" mode="outlined" maxLength={15} value={apellido} onChangeText={setApellido} right={<TextInput.Affix text="/15" />} style={styles.textInputRegistro} />
                  <TextInput name="edad" label="Edad" mode="outlined" maxLength={3} value={edad} onChangeText={setEdad} right={<TextInput.Affix text="/3" />} style={styles.textInputRegistro} />
                  <TextInput name="dni" label="DNI" mode="outlined" maxLength={8} value={dni} onChangeText={setDni} right={<TextInput.Affix text="/8" />} style={styles.textInputRegistro} />
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

                  <View style={styles.viewGeneroRegistro}>

                    <View style={styles.viewSwitchMale}>
                      <Switch
                        value={sexo === 'M'}
                        onValueChange={() => handleSexoChange('M')}
                        trackColor={{ true: 'skyblue', false: 'gray' }}
                        ios_backgroundColor="gray"
                        style={{ marginRight: 15 }}
                      />
                      <FontAwesome name="male" size={44} color="skyblue" />
                    </View>

                    <View style={styles.viewSwitchFem}>
                      <Switch
                        value={sexo === 'F'}
                        onValueChange={() => handleSexoChange('F')}
                        trackColor={{ true: 'pink', false: 'gray' }}
                        ios_backgroundColor="gray"
                        style={{ marginRight: 15 }}
                      />
                      <FontAwesome5 name="female" size={44} color="pink" />
                    </View>

                  </View>

                  <Divider color="#ccc" style={styles.divider} />

                  <Button title="Registrarme" onPress={handleSubmit} style={styles.buttonRegistrarme} />
                </View>
                <Button title="Volver al login" onPress={() => navigation.navigate("Login")} style={styles.buttonVolverLogin} />
              </>
            ) : (
              <View onSubmit={handleVerificar} style={styles.viewRegistroVerificar}>

                <Text style={styles.textTituloRegistro}>
                  Verifique su casilla de correo electronico e ingrese el codigo.
                </Text>

                <TextInput label="Ingrese el código" mode="outlined" placeholder="Código de verificacion" value={codigo} onChangeText={text => setCode(text)} maxLength={6} right={<TextInput.Affix text="/6" />} style={styles.textInputRegistroCodigo} />
                <Button title="Verificar cuenta" onPress={async () => await handleVerificar(codigo)} style={styles.buttonRegistroCodigo} />
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
    </ScrollView>
  );
}

export default Registro;
