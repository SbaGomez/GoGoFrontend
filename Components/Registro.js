import React, { useEffect, useState } from "react";
import { Surface, Stack, Button, Divider, Text } from "@react-native-material/core";
import { TextInput, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View } from 'react-native';
import axios from "axios";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 

function Registro() {

  const [users, setUsers]=useState([])

  useEffect(()=>{
    loadUesers();
    console.log("Code by Sebastian Gomez")
  },[]);

  const loadUesers=async()=>{
      const result=await axios.get("http://localhost:8282/users");
      console.log(result.data);
  };

  const navigation = useNavigation();
  const [sexo, setSexo] = useState("M");

  const handleSexoChange = (value) => {
    setSexo(value);
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
          height: 750,
        }}
      >

        <TextInput name="email" label="Email" mode="outlined" placeholder="@uade.edu.ar" right={<TextInput.Affix text="/50" />} style={{ width: '60%', height: 50, marginBottom: 10, display: 'flex', justifyContent: 'center' }} />
        <TextInput name="nombre" label="Nombre" mode="outlined" placeholder="Nombre" right={<TextInput.Affix text="/50" />} style={{ width: '60%', height: 50, marginBottom: 10, display: 'flex', justifyContent: 'center' }} />
        <TextInput name="apellido" label="Apellido" mode="outlined" placeholder="Apellido" right={<TextInput.Affix text="/50" />} style={{ width: '60%', height: 50, marginBottom: 10, display: 'flex', justifyContent: 'center' }} />
        <TextInput name="edad" label="Edad" mode="outlined" placeholder="Edad"maxLength={3} right={<TextInput.Affix text="/3" />} style={{ width: '60%', height: 50, marginBottom: 10, display: 'flex', justifyContent: 'center' }} />
        <TextInput name="dni" label="DNI" mode="outlined" placeholder="DNI" right={<TextInput.Affix text="/50" />} style={{ width: '60%', height: 50, marginBottom: 10, display: 'flex', justifyContent: 'center' }} />
        <TextInput name="password" label="Password" mode="outlined" placeholder="Password" maxLength={15} secureTextEntry right={<TextInput.Affix text="/15" />} style={{ width: '60%', height: 50, marginBottom: 20, display: 'flex', justifyContent: 'center' }} />

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
        <Button title="Registrarme" style={{ backgroundColor: '#24CAE8', width: '60%', height: 50, marginBottom: 15, display: 'flex', justifyContent: 'center' }} />
        <Button title="Volver" onPress={() => navigation.navigate("Login")} style={{ width: '60%', height: 50, display: 'flex', justifyContent: 'center' }} />

      </Surface>
    </Stack>
  );
}

export default Registro;
