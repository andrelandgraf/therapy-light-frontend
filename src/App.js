import React, { Component } from 'react';
import Therapy from './components/Therapy';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInTherapy: true,
    }
  }

  render() {
    const { isInTherapy } = this.state;
    if(isInTherapy){
      return (
        <Therapy />
      )
    }
    return (
      <div className="App">
        <header className="App-header">
            <h1>Therapylight - Your Chance to Hack your Relationship</h1>
            <h2>Creative Hack 2018 Netlight & Microsoft Student Partners</h2>
        </header>
      </div>
    );
  }
}

export default App;
