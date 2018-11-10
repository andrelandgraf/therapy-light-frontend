import React, { Component } from 'react';
import VideoCanvas from './components/VideoCanvas';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: undefined,
    }
  }

  componentDidMount() {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
              video: true,
              audio: true
          })
          .then(this.setStream)
          .catch(function (error) {
              console.log("Something went wrong!");
              console.log(error.message);
          });
    }
  }



  setStream = (stream) => {
    console.log(stream);
    // for debugging make variable available to browser console:
    // window.stream = stream;
    this.setState({stream: stream});
  }

  render() {
    const { stream } = this.state;
    return (
      <div className="App">
        <header className="App-header">
            <h1>Therapylight - Your Chance to Hack your Relationship</h1>
            <h2>Creative Hack 2018 Netlight & Microsoft Student Partners</h2>
        </header>
        <VideoCanvas stream={stream} />
      </div>
    );
  }
}

export default App;
