import React, { Component } from 'react';
import GoGo from './Components/GoGo'
import { View } from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <GoGo/>
      </View>
    );
  }
}
export default App;