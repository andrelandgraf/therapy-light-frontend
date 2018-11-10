import React, { Component } from 'react';
import VideoCanvas from './components/VideoCanvas';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.stream = undefined;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Therapylight - Your Chance to Hack your Relationship</h1>
            <h2>Creative Hack 2018 Netlight & Microsoft Student Partners</h2>
        </header>
        <VideoCanvas/ >
      </div>
    );
  }
}

export default App;
