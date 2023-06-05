import React, { useState, useEffect } from "react";
import { Surface, Stack, Text } from "@react-native-material/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Modal, ScrollView, Switch, TouchableWithoutFeedback } from 'react-native';
import * as Font from 'expo-font';
import styles from '../Utils/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Perfil() {
    const navigation = useNavigation();
    const route = useRoute();
    const [fontLoaded, setFontLoaded] = useState(false);

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


    // Funcion Perfil
    async function handlePerfil(email) {
        try {
            const response = await axios.post('http://localhost:8282/user/email', {
                email: route.params.email
            });
            AsyncStorage.setItem("token", token);
            navigation.navigate('Perfil', { email: email });
        } catch (error) {
            if (error.response && error.response.data === "Email o contraseña incorrectos") {
                setErrores(["Email o contraseña incorrectos."]);
                setModalVisible(true);
            }
            console.error(error);
        }
    }

return (

    <ScrollView>
        <Stack fill center spacing={4}>
            <Surface elevation={4} category="medium" style={styles.surfaceTitle}>
                <Text style={styles.titulo}>
                    Bienvenido, {route.params.email} !
                </Text>
            </Surface>

            <Surface elevation={4} category="medium" style={styles.surfaceViajes}>
            </Surface>
        </Stack>
    </ScrollView>

);
}

export default Perfil;
