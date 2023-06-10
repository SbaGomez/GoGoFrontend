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
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const currentDate = new Date();

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleConfirmTime = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const formatSelectedDate = () => {
    if (selectedDate) {
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();

      return `${day}/${month}/${year}`;
    }

    return '';
  };

  const formatSelectedTime = () => {
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
  
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  
    return '';
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
                <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirmDate}
                  onCancel={hideDatePicker}
                  minimumDate={currentDate}
                />
                <Text>{formatSelectedDate()}</Text>
              </View>
              <View>
                <Button title="Seleccionar Horario" onPress={showTimePicker} />
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirmTime}
                  onCancel={hideTimePicker}
                  is24Hour
                />
                <Text>{formatSelectedTime()}</Text>
              </View>

              <Button title="Crear Viaje" style={styles.buttonRegAuto} />
            </View>
          </Surface>
        )}
      </Stack>
    </ScrollView>
  );
}

export default Home;
