import React, { Component } from 'react';
import GoGo2 from './Components/GoGo2'
import Login2 from './Components/Login2'
import { View } from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <GoGo2/>
        <Login2/>
      </View>
    );
  }
}
export default App;