import React, { useState, useEffect } from "react";
import { Surface, Stack, Button, Text } from "@react-native-material/core";
import { ScrollView, View, Switch, Modal } from 'react-native';
import { TextInput } from "react-native-paper";
import * as Font from 'expo-font';
import styles from './Utils/Styles';
import axios from "axios";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';

function Home() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [mostrarCrearViaje, setMostrarCrearViaje] = useState(false);
  const [mostrarBuscarViajes, setMostrarBuscarViajes] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errores, setErrores] = useState([]);
  const currentDate = new Date(); //Fecha de hoy

  //Variables async-storage
  const [baseURL, setBaseURL] = useState(null);
  const [user, setUser] = useState(null);

  //Variables Viajes
  const [ubicacionInicioBuscarViaje, setUbicacionInicioBuscarViaje] = useState("");
  const [ubicacionDestinoBuscarViaje, setUbicacionDestinoBuscarViaje] = useState("");
  const [horarioSalida, setHorarioSalida] = useState("");
  const [turno, setTurno] = useState("");
  const [inicio, setInicio] = useState('UADE');
  const [destino, setDestino] = useState('UADE');
  const [viajes, setViajes] = useState(null);

  //point
  const [point, setPoint] = useState(true);

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

  //Obtener baseURL y User
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

    async function obtenerBaseUser() {
      try {
        const baseUserJSON = await AsyncStorage.getItem("baseUser");
        if (baseUserJSON !== null) {
          setUser(JSON.parse(baseUserJSON));
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadFontAsync();
    obtenerBaseUser();
    obtenerBaseURL();
  }, []);

  //Obtener fecha y hora formateada
  useEffect(() => {
    async function formatSelectedDateTime() {
      try {
        if (selectedDate && selectedTime) {
          const year = selectedDate.getFullYear();
          const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
          const day = String(selectedDate.getDate()).padStart(2, '0');
          const hours = String(selectedTime.getHours()).padStart(2, '0');
          const minutes = String(selectedTime.getMinutes()).padStart(2, '0');
          const seconds = String(selectedTime.getSeconds()).padStart(2, '0');

          const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
          setHorarioSalida(formattedDateTime);
          return formattedDateTime;
        }

        return '';
      } catch (error) {
        console.error(error);
      }
    }

    formatSelectedDateTime();
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    async function enableOrFalse() {
      try {
        if (isEnabled) {
          setDestino("UADE");
          //console.log("DESTINO: " + destino)
          setPoint(true);
        }
        else {
          setInicio("UADE");
          //console.log("INICIO: " + inicio)
          setPoint(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    enableOrFalse();
  }, [point]);

  // Funcion para las validaciones
  const validarFormulario = async () => {
    let erroresTemp = [];

    if (!inicio) {
      erroresTemp.push('Por favor, seleccione ubicacion de inicio.');
    }

    if (!destino) {
      erroresTemp.push('Por favor, seleccione ubicacion de destino.');
    }

    if (inicio == destino) {
      erroresTemp.push('No selecciono ubicacion de inicio o destino.');
    }

    if (!turno) {
      erroresTemp.push('Por favor, seleccione un turno.');
    }

    if (!selectedDate) {
      erroresTemp.push('Por favor, seleccione una fecha.');
    }

    if (!selectedTime) {
      erroresTemp.push('Por favor, seleccione un horario.');
    }

    if (user.auto === null) {
      erroresTemp.push('Para crear un viaje necesitas declarar un vehiculo.');
    }

    setErrores(erroresTemp);

    setPoint(false);
    return erroresTemp;
  }

  const validarFormularioBuscar = async () => {
    let erroresTemp = [];

    if (!ubicacionInicioBuscarViaje) {
      erroresTemp.push('Por favor, seleccione ubicacion de inicio.');
    }

    if (!ubicacionDestinoBuscarViaje) {
      erroresTemp.push('Por favor, seleccione ubicacion de destino.');
    }
    setErrores(erroresTemp);

    setPoint(false);
    return erroresTemp;
  }

  // Funcion para saber cuando abrir el modal
  useEffect(() => {
    if (errores.length > 0) {
      setModalVisible(true);
    }
  }, [errores]);

  const handleCrearViaje = async (event) => {
    event.preventDefault();
    /*console.log("Horario: " + horarioSalida);
    console.log("Turno: " + turno);
    console.log("Inicio: " + inicio);
    console.log("Destino: " + destino);*/

    const erroresFormulario = await validarFormulario();
    //console.log("Errores: " + erroresFormulario);
    if (erroresFormulario.length == 0) {
      try {
        const id = user.id;
        const response = await axios.post(baseURL + "/viaje/addViaje", {
          id, horarioSalida, turno, inicio, destino
        });
        console.log("ViajeCreado: " + "ID: " + response.data.id + " Horario: " + response.data.horarioSalida + " Turno: " + response.data.turno + " Inicio: " + response.data.inicio + " Destino: " + response.data.destino)
        // Reiniciamos los estados
        setHorarioSalida(""); setDestino("UADE"); setInicio("UADE"); setTurno(""); setSelectedDate(null); setSelectedTime(null);
      } catch (error) {
        // Aquí puedes manejar el error
        console.error(error);
        console.log("error crearviaje 01");
      }
    }
    else {
      // Aquí puedes mostrar los errores al usuario o hacer algo en caso de que existan
      console.log("error crearviaje 02");
    }
  };

  const handleBuscarViajes = async (event) => {
    event.preventDefault();
    const erroresFormulario = await validarFormularioBuscar();
    //console.log("Errores: " + erroresFormulario);
    if (erroresFormulario.length == 0) {
      try {
        const response = await axios.get(baseURL + `/viaje/buscarUbicacion/${ubicacionInicioBuscarViaje}/${ubicacionDestinoBuscarViaje}`);
        setViajes(response.data);
        console.log(response.data)
        // Reiniciamos los estados
        setMostrarBuscarViajes(false); setUbicacionInicioBuscarViaje(""); setUbicacionDestinoBuscarViaje("");
      } catch (error) {
        // Aquí puedes manejar el error
        if (error.response && error.response.data === "No se encontraron viajes") {
          setErrores(["No se encontraron viajes."]);
          setModalVisible(true);
        }
      }
    }
    else {
      // Aquí puedes mostrar los errores al usuario o hacer algo en caso de que existan
      console.log("error buscarviajes 02");
    }
  };

  //Funcion Inicio a Seleccionar
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

  //Funcion Ubicacion a Seleccionar Busqueda
  const handleSeleccionarUbicacionInicioBusqueda = (ubicacionInicioSeleccionada) => {
    setUbicacionInicioBuscarViaje(ubicacionInicioSeleccionada);
  };

  const handleSeleccionarUbicacionDestinoBusqueda = (ubicacionDestinoSeleccionada) => {
    setUbicacionDestinoBuscarViaje(ubicacionDestinoSeleccionada);
  };

  //Funcion Boton Mostrar Crear Viajes
  const handleBotonCrearViaje = () => {
    if (mostrarCrearViaje) {
      setMostrarCrearViaje(false);
      setHorarioSalida(""); setDestino("UADE"); setInicio("UADE"); setTurno(""); setSelectedDate(null), setSelectedTime(null)
    }
    else {
      setMostrarBuscarViajes(false);
      setMostrarCrearViaje(true);
      setViajes(null);
    }
  };

  //Funcion Boton Mostrar Buscar Viajes
  const handleBotonBuscarViajes = () => {
    if (mostrarBuscarViajes) {
      setMostrarBuscarViajes(false);
    }
    else {
      setMostrarCrearViaje(false);
      setHorarioSalida(""); setDestino("UADE"); setInicio("UADE"); setTurno(""); setSelectedDate(null), setSelectedTime(null)
      setMostrarBuscarViajes(true);
      setViajes(null);
    }
  };

  //Funciones del date/time picker
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
        <Surface elevation={4} category="medium" style={styles.surfaceHome}>
          <Button title="Crear Viaje" onPress={handleBotonCrearViaje} style={styles.buttonCrearViajes} />
          <Button title="Buscar Viajes" onPress={handleBotonBuscarViajes} style={styles.buttonBuscarViajes} />
        </Surface>
        {mostrarCrearViaje && (
          <Surface onSubmit={handleCrearViaje} elevation={4} category="medium" style={styles.surfaceCrearViajes}>
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

            <Text style={styles.textSubTitulo}>Seleccionar turno</Text>
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
                <Picker.Item label="Seleccione ubicacion de Inicio" value="" />
                <Picker.Item label="Villa Gesell" value="Villa Gesell" />
                <Picker.Item label="Pinamar" value="Pinamar" />
                <Picker.Item label="Mar Azul" value="Mar Azul" />
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
                <Picker.Item label="Seleccione ubicacion de destino" value="" />
                <Picker.Item label="Villa Gesell" value="Villa Gesell" />
                <Picker.Item label="Pinamar" value="Pinamar" />
                <Picker.Item label="Mar Azul" value="Mar Azul" />
                <Picker.Item label="Carilo" value="Carilo" />
                <Picker.Item label="Mar de las Pampas" value="Mar de las Pampas" />
                <Picker.Item label="Ostende" value="Ostende" />
                <Picker.Item label="Valeria" value="Valeria" />
              </Picker>
            </View>

            <Button title="Crear Viaje" onPress={handleCrearViaje} style={styles.buttonRegAuto} />
          </Surface>
        )}

        {mostrarBuscarViajes && (
          <Surface onSubmit={handleBuscarViajes} elevation={4} category="medium" style={styles.surfaceBuscarViajes}>
            <Text style={styles.textTituloBuscarViajes}>Buscar Viajes</Text>

            <Text style={styles.textSubTitulo}>Ubicacion inicio</Text>
            <View style={styles.PickerUbicacion}>
              <Picker selectedValue={ubicacionInicioBuscarViaje} onValueChange={handleSeleccionarUbicacionInicioBusqueda} style={styles.PickerInput}>
                <Picker.Item label="Villa Gesell" value="Villa Gesell" />
                <Picker.Item label="Pinamar" value="Pinamar" />
                <Picker.Item label="UADE" value="UADE" />
                <Picker.Item label="Mar Azul" value="Mar Azul" />
                <Picker.Item label="Seleccione una ubicacion" value="" />
                <Picker.Item label="Carilo" value="Carilo" />
                <Picker.Item label="Mar de las Pampas" value="Mar de las Pampas" />
                <Picker.Item label="Ostende" value="Ostende" />
                <Picker.Item label="Valeria" value="Valeria" />
              </Picker>
            </View>

            <Text style={styles.textSubTitulo}>Ubicacion Destino</Text>
            <View style={styles.PickerUbicacion}>
              <Picker selectedValue={ubicacionDestinoBuscarViaje} onValueChange={handleSeleccionarUbicacionDestinoBusqueda} style={styles.PickerInput}>
                <Picker.Item label="Villa Gesell" value="Villa Gesell" />
                <Picker.Item label="Pinamar" value="Pinamar" />
                <Picker.Item label="UADE" value="UADE" />
                <Picker.Item label="Mar Azul" value="Mar Azul" />
                <Picker.Item label="Seleccione una ubicacion" value="" />
                <Picker.Item label="Carilo" value="Carilo" />
                <Picker.Item label="Mar de las Pampas" value="Mar de las Pampas" />
                <Picker.Item label="Ostende" value="Ostende" />
                <Picker.Item label="Valeria" value="Valeria" />
              </Picker>
            </View>
            <Button title="Buscar Viajes" onPress={handleBuscarViajes} style={styles.buttonRegAuto} />
          </Surface>
        )}


        {viajes && viajes.map((item) => (
          <Surface key={item.id} elevation={4} category="medium" style={styles.surfaceViewViajes}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
            <Text style={styles.textFont20}>Fecha: <Text style={styles.textFechaBuscarViajesHome}>{new Date(item.horarioSalida).toLocaleDateString()}</Text></Text> 
            <Text style={styles.textFont20}>Hora: <Text style={styles.textHoraBuscarViajesHome}>{new Date(item.horarioSalida).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></Text> 
            <Text style={styles.textFont20}>Turno: <Text style={styles.textTurnoBuscarViajesHome}>{item.turno}</Text></Text> 
            <Text style={styles.textFont20}>Inicio: <Text style={styles.textInicioBuscarViajesHome}>{item.ubicacionInicio}</Text></Text> 
            <Text style={styles.textFont20}>Destino: <Text style={styles.textDestinoBuscarViajesHome}>{item.ubicacionDestino}</Text></Text> 
            </View>
            <View style={{ alignItems: 'center' }}>
            <Button title="Ver viaje" style={{ width: 150, marginLeft: 40 }} />
            <Button title="Sumarse" style={{ width: 150, marginLeft: 40, marginTop: 15, backgroundColor: '#2DCCE9' }} />
            </View>
          </View>
        </Surface>
        ))}

      </Stack>

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
    </ScrollView>
  );
}

export default Home;
