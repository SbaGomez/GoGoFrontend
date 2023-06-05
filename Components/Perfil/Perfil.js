import React, { useState, useEffect } from "react";
import { Surface, Stack, Text } from "@react-native-material/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from 'react-native';
import * as Font from 'expo-font';
import styles from '../Utils/Styles';


function Perfil() {
    const navigation = useNavigation();
    const route = useRoute();
    const [fontLoaded, setFontLoaded] = useState(false);
    const [user, setUser] = useState(null);

    // Font propia
    const loadFontAsync = async () => {
        await Font.loadAsync({
            'BebasNeue': require('../../assets/fonts/BebasNeue.ttf'),
        });
        setFontLoaded(true);
    }

    useEffect(() => {
        const getUserByEmail = async () => {
            const email = route.params.email; // Replace with the email you have
            console.log(email);
            try {
                const response = await axios.get(`http://localhost:8282/user/email/${email}`);
                setUser(response.data);
                console.log(user);
            } catch (error) {
                if (error.response) {
                    // Request was made and server responded with a status code
                    console.log("Error:" + error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log("Error, No response received from the server");
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.log("Error, An unexpected error occurred");
                }
            }
        };

        getUserByEmail();
        loadFontAsync();
    }, []);

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
