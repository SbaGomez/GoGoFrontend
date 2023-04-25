import React, { Component } from 'react';
import GoGo from './Components/GoGo'
import Login from './Components/Login'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ width: '100%', justifyContent: 'center' }}>
        <GoGo />
        <Login/>
      </div>
    );
  }
}
export default App;