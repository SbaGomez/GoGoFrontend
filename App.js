import React, { Component } from "react";
import { View } from 'react-native';
import GoGo from './Components/GoGo';
import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component {
  componentDidMount() {
    async function setBaseURL() {
      const baseURL = "http://192.168.1.100:8282";
      await AsyncStorage.setItem("baseURL", baseURL);
    }
    setBaseURL();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GoGo />
      </View>
    );
  }
}

export default App;