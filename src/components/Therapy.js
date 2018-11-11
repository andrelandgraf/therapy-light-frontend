import React, { Component } from 'react';
import SpeechToText from '../services/SpeechToText';
import TextToSpeech from '../services/TextToSpeech';
import WebcamCapture from "./WebcamCapture";
import '../styles/Therapy.css';
import TherapyBot from '../services/TherapyBot';

class Therapy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: undefined,
      recordedText: '',
      bot: undefined
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
    this.setState({bot: new TherapyBot(this.playText)})
  }

  emotionsDetected = (emotions) => {
    this.state.bot.setEmotions(emotions);
  }

  setStream = (stream) => {
    console.log(stream);
    // for debugging make variable available to browser console:
    // window.stream = stream;
    this.setState({stream: stream});
    this.startListen();
  }

  startListen = () => {
    const speechToText = new SpeechToText(this.setRecordedTextAndReact);
    speechToText.listen();
  }

  setRecordedTextAndReact = (string) => {
    this.setState({string});
    this.state.bot.setRecordedText(string);
    // this.playBotResult(string);
  }

  playText = (string) => {
    const textToSpeechService = new TextToSpeech();
    textToSpeechService.say(string);
  }

  render() {
    // const { stream, recordedText } = this.state;
    return (
      <div className="App">
        <header className="App-header">
            <h1>Therapylight - Your Chance to Hack your Relationship</h1>
            <h2>Creative Hack 2018 Netlight & Microsoft Student Partners</h2>
        </header>
        <WebcamCapture setEmotions={this.emotionsDetected}/>
      </div>
    );
  }
}

export default Therapy;
