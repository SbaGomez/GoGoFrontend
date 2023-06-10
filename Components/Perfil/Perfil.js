import React, { useState, useEffect } from "react";
import { Surface, Stack, Text, Button } from "@react-native-material/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, ScrollView, Image, Modal } from 'react-native';
import Masculino from '../../assets/FotoPerfilMas.png';
import Femenino from '../../assets/FotoPerfilFem.png';
import { TextInput } from "react-native-paper";
import { FontAwesome, Feather } from '@expo/vector-icons';
import axios from "axios";
import * as Font from 'expo-font';
import styles from '../Utils/Styles';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Perfil() {
    const [baseURL, setBaseURL] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const [fontLoaded, setFontLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const [auto, setAuto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mostrarRegAuto, setMostrarRegAuto] = useState(false);
    const [mostrarAuto, setMostrarAuto] = useState(false);
    const [mostrar, setMostrar] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [errores, setErrores] = useState([]);
    const [modelosDisponibles, setModelosDisponibles] = useState([]);
    const [mostrarCancelarAuto, setMostrarCancelarAuto] = useState(false);

    //Obtener baseURL
    useEffect(() => {
        async function obtenerBaseURL() {
            try {
                const baseURL = await AsyncStorage.getItem("baseURL");
                if (baseURL !== null) {
                    console.log(baseURL);
                    setBaseURL(baseURL);
                }
            } catch (error) {
                console.error(error);
            }
        }
        obtenerBaseURL();
    }, []);

    // variables registro auto
    const [patente, setPatente] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [color, setColor] = useState("");

    // Font propia
    const loadFontAsync = async () => {
        await Font.loadAsync({
            'BebasNeue': require('../../assets/fonts/BebasNeue.ttf'),
        });
        setFontLoaded(true);
    }

    // Funcion para las validaciones
    const validarFormulario = async () => {
        let erroresTemp = [];

        if (!patente) {
            erroresTemp.push('Por favor, ingrese una patente.');
        } else if (patente.length < 6 || patente.length > 7) {
            erroresTemp.push('La patente debe tener entre 6 y 7 caracteres.');
        }

        if (!marca) {
            erroresTemp.push('Por favor, ingrese una marca.');
        }

        if (!modelo) {
            erroresTemp.push('Por favor, ingrese un modelo.');
        }

        if (!color) {
            erroresTemp.push('Por favor, ingrese un color.');
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

    useEffect(() => {
        const getUserByEmail = async () => {
            const email = route.params.email; // Replace with the email you have
            try {
                const response = await axios.get(baseURL + `/user/email/${email}`);
                setUser(response.data);
                console.log(response.data);
                setIsLoading(false);

            } catch (error) {
                if (error.response) {
                    // Request was made and server responded with a status code
                    console.log("Error:" + error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log("Error User, No response received from the server");
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.log("Error User, An unexpected error occurred");
                }
            }
        };
        getUserByEmail();
        loadFontAsync();

    }, [baseURL]);

    useEffect(() => {
        if (auto == null) {
            setMostrar(true)
        } else {
            setMostrar(false)
        }
    }, [user, auto]);

    useEffect(() => {
        const getAutoById = async () => {
            try {
                const response = await axios.get(baseURL + `/auto/${user.user.auto.id}`);
                setAuto(response.data);
                console.log(response.data);
                setMostrarAuto(true);
            } catch (error) {
                if (error.response) {
                    // Request was made and server responded with a status code
                    console.log("Error:" + error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log("Error Auto, No response received from the server");
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.log("Error Auto, An unexpected error occurred");
                }
            }
        };

        if (user != null) {
            getAutoById();
        }

    }, [user]);

    const handleRegAuto = async (event) => {
        event.preventDefault();
        const erroresFormulario = await validarFormulario();
        console.log(erroresFormulario);
        const id = user.user.id;
        if (erroresFormulario.length == 0) {
            try {
                setMostrarRegAuto(false);
                const response = await axios.post(baseURL + "/auto/addAuto", {
                    patente, marca, modelo, color, id
                });
                console.log(response.data)
                setAuto(response.data)
                setIsLoading(false)
                setMostrarAuto(true)
                // Reiniciamos los estados
                setPatente(""); setMarca(""); setModelo(""); setColor("");
            } catch (error) {
                // Aquí puedes manejar el error
                console.error(error);
                console.log("error regauto perfil 01");
            }
        } else {
            // Aquí puedes mostrar los errores al usuario o hacer algo en caso de que existan
            console.log("error regauto perfil 02");
        }
    };

    const handleDeleteAuto = async (event) => {
        event.preventDefault();
        try {
            const responseUser = await axios.get(baseURL + `/user/email/${route.params.email}`);
            setUser(responseUser.data);
            console.log(user)
            const id = responseUser.data.user.auto.id
            const response = await axios.post(baseURL + `/auto/${id}/delete`);
            // Aquí puedes hacer algo después de que se ha registrado el usuario
            console.log(response.data);
            setAuto(null)
            user.user.auto = null;
            console.log(user)

            setIsLoading(false)
            setMostrarAuto(false);
            setMostrar(true)
        } catch (error) {
            // Aquí puedes manejar el error
            console.error(error);
            console.log("error deleteauto perfil 02");
        }
    };

    const handleMostrarRegAuto = () => {
        if (mostrar) {
            setMostrar(false)
            setMostrarRegAuto(true);
        }
        else {
            setMostrarRegAuto(false);
        }
    };

    const handleCancelarAuto = () => {
        setMostrarCancelarAuto(true)
        if (!mostrarCancelarAuto) {
            setMostrar(true)
            setMostrarRegAuto(false);
            setMostrarCancelarAuto(false)
            setPatente(""); setMarca(""); setModelo(""); setColor("");
        }
    }

    //Lista de Modelos por Marca
    const modelosPorMarca = {
        'Ford': ['Focus', 'Mondeo', 'Ranger Limited', 'Mustang', 'Explorer', 'Escape', 'Edge', 'Fiesta', 'Fusion', 'Expedition', 'F-150', 'Bronco', 'EcoSport', 'Transit', 'GT'],
        'Mercedes Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA-Class', 'GLC-Class', 'GLE-Class', 'GLS-Class', 'SL-Class', 'AMG GT', 'CLA-Class', 'CLS-Class', 'G-Class', 'Maybach S-Class', 'EQC', 'B-Class', 'GLB-Class', 'GLK-Class', 'GLE Coupe', 'SLC-Class', 'SLK-Class', 'V-Class', 'X-Class', 'EQA', 'EQB', 'EQS', 'AMG A-Class', 'AMG C-Class', 'AMG E-Class', 'AMG G-Class'],
        'Volkswagen': ['Golf', 'Polo', 'Passat', 'Jetta', 'Tiguan', 'Touareg', 'Beetle', 'Arteon', 'Up!', 'Amarok', 'Scirocco', 'T-Roc', 'ID.3', 'ID.4', 'Atlas', 'Gol Trend', 'Gol', 'T-Cross', 'Vento'],
    };

    //Funcion Marca a Seleccionar
    const handleSeleccionarMarca = (marcaSeleccionada) => {
        setMarca(marcaSeleccionada);
        const modelosObtenidos = modelosPorMarca[marcaSeleccionada] || [];
        setModelosDisponibles(modelosObtenidos);
        setModelo('');
    };

    if (isLoading) {
        return (
            <ScrollView>
                <Stack fill center spacing={4}>
                    <Surface elevation={4} category="medium" style={styles.surfaceTitle}>
                        <Text style={styles.titulo}>Loading Perfil...</Text>
                    </Surface>
                </Stack>
            </ScrollView>
        );
    }

    return (
        <ScrollView>
            <Stack fill center spacing={4}>
                <Surface elevation={4} category="medium" style={mostrar ? styles.surfacePerfilInfoConAuto : styles.surfacePerfilInfoSinAuto}>
                    <Image source={user.user.sexo === 'F' ? Femenino : Masculino} style={styles.FotoPerfil} />
                    <Text style={styles.textPerfil}>
                        {user.user.nombre} {user.user.apellido}
                    </Text>
                    <Text style={styles.textDniInfoPerfil}>DNI: <Text style={styles.textDniInfo}>{user.user.dni}</Text></Text>

                    <View style={styles.divisor} />

                    <View styles={styles.viewPerfilInfo}>
                        <Text style={styles.textInfoPerfil}>Email: {user.user.email}</Text>
                        <Text style={styles.textInfoPerfil}>Edad: {user.user.edad}</Text>
                        <Text style={styles.textInfoPerfil}>Sexo: {user.user.sexo === 'F' ? <FontAwesome name="female" size={25} color="skyblue" /> : <FontAwesome name="male" size={25} color="skyblue" />}</Text>
                    </View>

                    <View style={styles.divisor} />

                    <Button title="Cambiar Foto" style={styles.buttonCambiarFoto} />
                    {mostrar && (
                        <Button title="Registrar Auto" onPress={handleMostrarRegAuto} style={styles.buttonRegistrarAuto} />
                    )}
                </Surface>
                {mostrarRegAuto && (
                    <Surface elevation={4} category="medium" style={styles.surfaceRegAuto}>
                        <View onSubmit={handleRegAuto} style={styles.viewRegistroVerificar}>
                            <Text style={styles.textTituloRegAuto}>Ingrese datos del vehiculo</Text>
                            <TextInput label="Patente" mode="outlined" placeholder="Patente del Vehiculo" value={patente} onChangeText={text => setPatente(text.toUpperCase())} maxLength={7} right={<TextInput.Affix text="/7" />} style={styles.textInputPatenteAuto} />
                            <View style={styles.PickerMarcaAuto}>
                                <Picker selectedValue={marca} onValueChange={handleSeleccionarMarca} style={{ flex: 1 }}>
                                    <Picker.Item label="Seleccione una marca" value="" />
                                    <Picker.Item label="Ford" value="Ford" />
                                    <Picker.Item label="Volkswagen" value="Volkswagen" />
                                    <Picker.Item label="Fiat" value="Fiat" />
                                    <Picker.Item label="Subaru" value="Subaru" />
                                    <Picker.Item label="Mercedes Benz" value="Mercedes Benz" />
                                    <Picker.Item label="BMW" value="BMW" />
                                </Picker>
                            </View>
                            <View style={styles.PickerModeloAuto}>
                                <Picker selectedValue={modelo} onValueChange={text => setModelo(text)} style={{ flex: 1 }} enabled={marca !== ''}>
                                    <Picker.Item label="Seleccione un modelo" value="" />
                                    {modelosDisponibles.map((modeloDisponible, index) => (
                                        <Picker.Item key={index} label={modeloDisponible} value={modeloDisponible} />
                                    ))}
                                </Picker>
                            </View>
                            <TextInput label="Color" mode="outlined" placeholder="Color del Vehiculo" value={color} onChangeText={text => setColor(text)} maxLength={15} right={<TextInput.Affix text="/15" />} style={styles.textInputRegistroCodigo} />
                            <Button title="Agregar Auto" onPress={handleRegAuto} style={styles.buttonRegAuto} />
                            <Button title="Cancelar" onPress={handleCancelarAuto} style={styles.buttonCancelarRegAuto} />
                        </View>
                    </Surface>
                )}

                {mostrarAuto && auto !== null && (
                    <Surface elevation={4} category="medium" style={styles.surfaceAuto}>
                        <View style={styles.viewRegistroVerificar}>
                            <Text style={styles.textTituloAuto}>Datos de tu vehiculo</Text>
                            <Text style={styles.textInfoAutoPerfil}>Patente: {auto.patente}</Text>
                            <Text style={styles.textInfoAutoPerfil}>Marca: {auto.marca}</Text>
                            <Text style={styles.textInfoAutoPerfil}>Modelo: {auto.modelo}</Text>
                            <Text style={styles.textInfoAutoPerfil}>Color: {auto.color}</Text>
                            <Button title="Borrar Auto" onPress={handleDeleteAuto} style={styles.buttonDeleteAuto} />
                        </View>
                    </Surface>
                )}

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

            </Stack>
        </ScrollView>
    );

}

export default Perfil;
