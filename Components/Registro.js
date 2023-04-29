import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Divider, Text } from "@react-native-material/core";
import { TextInput, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import axios from "axios";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

function Registro() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      position: 'absolute',
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 35,
      marginTop: 100,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 4,
      width: '100%',
      height: 'auto',
    }
  });

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [dni, setDni] = useState("");
  const [clave, setClave] = useState("");
  const [sexo, setSexo] = useState("");
  const [errores, setErrores] = useState([]);

  const handleSexoChange = (value) => {
    setSexo(value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let nameRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  const validarFormulario = () => {
    let erroresTemp = [];
    if (clave.length < 8 || clave.length > 15) {
      erroresTemp.push('La contraseña debe tener entre 8 y 15 caracteres.');
    }

    if (!email || !nombre || !apellido || !edad || !dni || !clave || !sexo) {
      erroresTemp.push('Por favor, complete todos los campos.');
    }

    if (!emailRegex.test(email)) {
      erroresTemp.push('Por favor, ingrese una dirección de correo electrónico válida.');
    }

    if (!sexo) {
      erroresTemp.push('Por favor, seleccione su sexo.');
    }

    setErrores(erroresTemp);

    return erroresTemp;
  }

  useEffect(() => {
    if (errores.length > 0) {
      setModalVisible(true);
    }
  }, [errores]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const erroresFormulario = validarFormulario();

    if (erroresFormulario.length === 0) {
      const data = {
        email,
        nombre,
        apellido,
        edad,
        dni,
        clave,
        sexo,
      };

      axios.post("http://localhost:8282/user/addUser", data)
        .then((response) => {
          console.log(response.data);
          // Aquí puedes hacer algo después de que se ha registrado el usuario
          navigation.navigate("Success");
        })
        .catch((error) => {
          console.error(error);
          // Aquí puedes manejar el error
        });

      // Reiniciamos los estados
      setEmail("");
      setNombre("");
      setApellido("");
      setEdad("");
      setDni("");
      setClave("");
      setSexo("");
      setErrores([]);

    } else {
      // Aquí puedes mostrar los errores al usuario o hacer algo en caso de que existan
      console.log(errores);
    }
  };

  return (
    <Stack fill center spacing={4}>
      <Surface
        elevation={6}
        category="medium"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 600,
          height: 700,
        }}
      >

        <View onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>

          <TextInput name="email" label="Email" mode="outlined" value={email} onChangeText={setEmail} right={<TextInput.Affix text="/50" />} style={{ width: '60%', height: 50, marginBottom: 10, display: 'flex', justifyContent: 'center' }} />
          <TextInput name="nombre" label="Nombre" mode="outlined" value={nombre} onChangeText={setNombre} right={<TextInput.Affix text="/50" />} style={{ width: '60%', height: 50, marginBottom: 10, display: 'flex', justifyContent: 'center' }} />
          <TextInput name="apellido" label="Apellido" mode="outlined" value={apellido} onChangeText={setApellido} right={<TextInput.Affix text="/50" />} style={{ width: '60%', height: 50, marginBottom: 10, display: 'flex', justifyContent: 'center' }} />
          <TextInput name="edad" label="Edad" mode="outlined" maxLength={3} value={edad} onChangeText={setEdad} right={<TextInput.Affix text="/3" />} style={{ width: '60%', height: 50, marginBottom: 10, display: 'flex', justifyContent: 'center' }} />
          <TextInput name="dni" label="DNI" mode="outlined" value={dni} onChangeText={setDni} right={<TextInput.Affix text="/50" />} style={{ width: '60%', height: 50, marginBottom: 10, display: 'flex', justifyContent: 'center' }} />
          <TextInput name="clave" label="Contraseña" mode="outlined" value={clave} onChangeText={setClave} maxLength={15} secureTextEntry right={<TextInput.Affix text="/15" />} style={{ width: '60%', height: 50, marginBottom: 20, display: 'flex', justifyContent: 'center' }} />

          <View style={{ flexDirection: 'row', width: '30%', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton.Group
                onValueChange={handleSexoChange}
                value={sexo}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="M" color="purple" />
                  {/*<Text color="#49454F" variant="h6">Masculino </Text>*/}
                  <FontAwesome name="male" size={44} color="skyblue" />
                </View>
              </RadioButton.Group>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton.Group
                onValueChange={handleSexoChange}
                value={sexo}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="F" color="purple" />
                  {/*<Text color="#49454F" variant="h6">Femenino </Text>*/}
                  <FontAwesome5 name="female" size={44} color="pink" />
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <Divider color="#ccc" style={{ width: '70%', marginBottom: 30, marginTop: 25, display: 'flex', justifyContent: 'center' }} />

          <View style={styles.centeredView}>
  <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)} animationType="slide">
    <View style={styles.modalView}>
      {errores.map((error, index) => (
        <Text key={index} style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
      ))}
      <Button title="Cerrar" style={{ marginTop: 20 }} onPress={() => setModalVisible(false)} />
    </View>
  </Modal>
</View>


          <Button title="Registrarme" onPress={handleSubmit} style={{ backgroundColor: '#24CAE8', width: '60%', height: 50, marginBottom: 15, display: 'flex', justifyContent: 'center' }} />

        </View>

        <Button title="Volver al login" onPress={() => navigation.navigate("Login")} style={{ width: '60%', height: 50, display: 'flex', justifyContent: 'center' }} />

      </Surface>
    </Stack>
  );
}

export default Registro;
