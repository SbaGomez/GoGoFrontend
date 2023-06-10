import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Surface, Stack, Text } from "@react-native-material/core";
import { ScrollView } from 'react-native';
import * as Font from 'expo-font';
import styles from './Utils/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);

  // Font propia
  const loadFontAsync = async () => {
    await Font.loadAsync({
      'BebasNeue': require('../assets/fonts/BebasNeue.ttf'),
    });
    setFontLoaded(true);
  }

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

  return (
    <ScrollView>
      <Stack flex={1} center spacing={4} direction="column">
        <Surface elevation={4} category="medium" style={styles.surfaceViajes}>
          <Text style={styles.titulo}>{email}</Text>
        </Surface>
      </Stack>
    </ScrollView>
  );
}

export default Home;
