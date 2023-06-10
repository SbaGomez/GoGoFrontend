import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { ScrollView, View } from 'react-native';
import { TextInput } from "react-native-paper";
import * as Font from 'expo-font';
import styles from './Utils/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";


function Home() {
  const [baseURL, setBaseURL] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState(null);
  const [mostrarCrearViaje, setMostrarCrearViaje] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);



  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };



  // Font propia
  const loadFontAsync = async () => {
    await Font.loadAsync({
      'BebasNeue': require('../assets/fonts/BebasNeue.ttf'),
    });
    setFontLoaded(true);
  }

  //Obtener baseURL
  useEffect(() => {
    async function obtenerBaseURL() {
      try {
        const baseURL = await AsyncStorage.getItem("baseURL");
        if (baseURL !== null) {
          setBaseURL(baseURL);
        }
      } catch (error) {
        console.error(error);
      }
    }
    obtenerBaseURL();
  }, []);

  useEffect(() => {
    async function obtenerEmail() {
      try {
        const email = await AsyncStorage.getItem("email");
        if (email !== null) {
          // Aquí puedes utilizar el valor del email
          console.log(email);
          setEmail(email);
        }
      } catch (error) {
        console.error(error);
      }
    }

    obtenerEmail();
  }, []);

  useEffect(() => {
    loadFontAsync();
  }, []);

  const handleCrearViaje = () => {
    if (mostrarCrearViaje) {
      setMostrarCrearViaje(false);
    }
    else {
      setMostrarCrearViaje(true);
    }
  };

  return (
    <ScrollView>
      <Stack flex={1} center spacing={4} direction="column">
        <Surface elevation={4} category="medium" style={styles.surfaceViajes}>
          <Button title="Crear Viaje" onPress={handleCrearViaje} style={styles.buttonRegAuto} />
        </Surface>
        {mostrarCrearViaje && (
          <Surface elevation={4} category="medium" style={styles.surfaceRegAuto}>
            <View style={styles.viewRegistroVerificar}>
              <Text style={styles.textTituloRegAuto}>Crear Viaje</Text>
              <View>
                <Button title="Show Date Picker" onPress={showDatePicker} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <Text>{selectedDate && selectedDate.toString()}</Text>
              <TextInput label="Patente" mode="outlined" placeholder="Patente del Vehiculo" maxLength={7} right={<TextInput.Affix text="/7" />} style={styles.textInputPatenteAuto} />
              <TextInput label="Color" mode="outlined" placeholder="Color del Vehiculo" maxLength={15} right={<TextInput.Affix text="/15" />} style={styles.textInputRegistroCodigo} />
              <Button title="Crear Viaje" style={styles.buttonRegAuto} />
              <Button title="Cancelar" style={styles.buttonCancelarRegAuto} />
            </View>
          </Surface>
        )}
      </Stack>
    </ScrollView>
  );
}

export default Home;
