import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { ScrollView, View, Switch } from 'react-native';
import { TextInput } from "react-native-paper";
import * as Font from 'expo-font';
import styles from './Utils/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';


function Home() {
  const [baseURL, setBaseURL] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState(null);
  const [mostrarCrearViaje, setMostrarCrearViaje] = useState(false);
  const [mostrarBuscarViajes, setMostrarBuscarViajes] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const currentDate = new Date();

  //Variables Buscar Viajes
  const [ubicacion, setUbicacion] = useState("");
  const [turno, setTurno] = useState("");
  const [inicio, setInicio] = useState("");
  const [destino, setDestino] = useState("");

  //Variables Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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


  //Funcion Destino a Seleccionar
  const handleSeleccionarInicio = (inicioSeleccionado) => {
    setInicio(inicioSeleccionado);
  };

  //Funcion Inicio a Seleccionar
  const handleSeleccionarDestino = (destinoSeleccionado) => {
    setDestino(destinoSeleccionado);
  };

  //Funcion Turno a Seleccionar
  const handleSeleccionarTurno = (turnoSeleccionado) => {
    setTurno(turnoSeleccionado);
  };

  //Funcion Ubicacion a Seleccionar
  const handleSeleccionarUbicacion = (ubicacionSeleccionada) => {
    setUbicacion(ubicacionSeleccionada);
  };

  const handleCrearViaje = () => {
    if (mostrarCrearViaje) {
      setMostrarCrearViaje(false);
      setSelectedDate(null);
      setSelectedTime(null);
    }
    else {

      setMostrarBuscarViajes(false);
      setMostrarCrearViaje(true);
    }
  };

  const handleBuscarViajes = () => {
    if (mostrarBuscarViajes) {
      setMostrarBuscarViajes(false);
    }
    else {

      setMostrarCrearViaje(false);
      setMostrarBuscarViajes(true);
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

  const formatSelectedDateTime = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const formattedTime = format(selectedTime, 'HH:mm:ss');

      return `${formattedDate}T${formattedTime}`;
    }

    return '';
  };

  return (
    <ScrollView>
      <Stack flex={1} center spacing={4} direction="column">
        <Surface elevation={4} category="medium" style={styles.surfaceHome}>
          <Button title="Crear Viaje" onPress={handleCrearViaje} style={styles.buttonCrearViajes} />
          <Button title="Buscar Viajes" onPress={handleBuscarViajes} style={styles.buttonBuscarViajes} />
        </Surface>
        {mostrarCrearViaje && (
          <Surface elevation={4} category="medium" style={styles.surfaceCrearViajes}>
            <Text style={styles.textTituloCrearViajes}>Crear Viaje</Text>

            <Button title="Seleccionar Fecha" onPress={showDatePicker} style={styles.buttonSeleccionarFecha} />
            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirmDate} onCancel={hideDatePicker} minimumDate={currentDate} />
            {selectedDate && (
              <TextInput label="Fecha Seleccionada" mode="outlined" value={`${formatSelectedDate()}`} editable={false} style={styles.textInputDateTime} />
            )}

            <Button title="Seleccionar Horario" onPress={showTimePicker} style={styles.buttonSeleccionarFecha} />
            <DateTimePickerModal isVisible={isTimePickerVisible} mode="time" onConfirm={handleConfirmTime} onCancel={hideTimePicker} is24Hour />

            {selectedTime && (
              <TextInput label="Horario Seleccionado" mode="outlined" value={`${formatSelectedTime()}`} editable={false} style={styles.textInputDateTime} />
            )}

            <View style={styles.PickerTurno}>
              <Picker selectedValue={turno} onValueChange={handleSeleccionarTurno} style={styles.PickerInput}>
                <Picker.Item label="Seleccione un turno" value="" />
                <Picker.Item label="Mañana" value="Mañana" />
                <Picker.Item label="Tarde" value="Tarde" />
                <Picker.Item label="Noche" value="Noche" />
              </Picker>
            </View>

            <View style={styles.viewSwitchUbicacion}>
              <View style={styles.viewSwitchIda}><Text style={styles.textFont20}>Ida</Text></View>
              <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isEnabled} />
              <View style={styles.viewSwitchVuelta}><Text style={styles.textFont20}>Vuelta</Text></View>
            </View>

            <Text style={styles.textSubTitulo}>Ubicacion inicio</Text>

            <View style={styles.ViewUbicacion}>
              <Picker selectedValue={isEnabled ? "UADE" : inicio} onValueChange={handleSeleccionarInicio} enabled={!isEnabled} style={styles.PickerInput} >
                {!isEnabled ? null : <Picker.Item label="UADE" value="UADE" />}
                <Picker.Item label="Villa Gesell" value="Villa Gesell" />
                <Picker.Item label="Pinamar" value="Pinamar" />
                <Picker.Item label="Mar Azul" value="Mar Azul" />
                <Picker.Item label="Seleccione ubicacion de Inicio" value="" />
                <Picker.Item label="Carilo" value="Carilo" />
                <Picker.Item label="Mar de las Pampas" value="Mar de las Pampas" />
                <Picker.Item label="Ostende" value="Ostende" />
                <Picker.Item label="Valeria" value="Valeria" />
              </Picker>
            </View>

            <Text style={styles.textSubTitulo}>Ubicacion Destino</Text>

            <View style={styles.ViewUbicacion}>
              <Picker selectedValue={!isEnabled ? "UADE" : destino} onValueChange={handleSeleccionarDestino} enabled={isEnabled} style={styles.PickerInput}>
                {isEnabled ? null : <Picker.Item label="UADE" value="UADE" />}
                <Picker.Item label="Villa Gesell" value="Villa Gesell" />
                <Picker.Item label="Pinamar" value="Pinamar" />
                <Picker.Item label="Mar Azul" value="Mar Azul" />
                <Picker.Item label="Seleccione ubicacion de destino" value="" />
                <Picker.Item label="Carilo" value="Carilo" />
                <Picker.Item label="Mar de las Pampas" value="Mar de las Pampas" />
                <Picker.Item label="Ostende" value="Ostende" />
                <Picker.Item label="Valeria" value="Valeria" />
              </Picker>
            </View>

            <Button title="Crear Viaje" style={styles.buttonRegAuto} />
          </Surface>
        )}

        {mostrarBuscarViajes && (
          <Surface elevation={4} category="medium" style={styles.surfaceBuscarViajes}>
            <Text style={styles.textTituloBuscarViajes}>Buscar Viajes</Text>
            <View style={styles.PickerUbicacion}>
              <Picker selectedValue={ubicacion} onValueChange={handleSeleccionarUbicacion} style={styles.PickerInput}>
                <Picker.Item label="Villa Gesell" value="Villa Gesell" />
                <Picker.Item label="Pinamar" value="Pinamar" />
                <Picker.Item label="Mar Azul" value="Mar Azul" />
                <Picker.Item label="Seleccione una ubicacion" value="" />
                <Picker.Item label="Carilo" value="Carilo" />
                <Picker.Item label="Mar de las Pampas" value="Mar de las Pampas" />
                <Picker.Item label="Ostende" value="Ostende" />
                <Picker.Item label="Valeria" value="Valeria" />
              </Picker>
            </View>
            <Button title="Buscar Viajes" style={styles.buttonRegAuto} />
          </Surface>
        )}
      </Stack>
    </ScrollView>
  );
}

export default Home;
