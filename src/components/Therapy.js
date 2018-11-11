import React, { Component } from 'react';
import SpeechToText from '../services/SpeechToText';
import TextToSpeech from '../services/TextToSpeech';
import WebcamCapture from "./WebcamCapture";
import '../styles/Therapy.css';
import TherapyBot from '../services/TherapyBot';
import Emojis from './Emojis';

class Therapy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: undefined,
      recordedText: '',
      bot: new TherapyBot(this.playText)
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

  emotionsDetected = (emotions) => {
    this.state.bot.setEmotions(emotions);
    this._emojis.updateEmotions(emotions);
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
  }

  playText = (string) => {
    const textToSpeechService = new TextToSpeech();
    textToSpeechService.say(string);
  }

  render() {
    // const { stream, recordedText } = this.state;
    return (
        <div style={{width: '50%'}}>
          <div className="emojis" style={{width: '10%', float: 'left', marginTop: '125px'}}>
          <Emojis ref={(emojis) => {this._emojis = emojis;}}></Emojis>
          </div>
          <div className="webcam" style={{marginLeft: '10%'}}>
            <WebcamCapture setEmotions={this.emotionsDetected}/>
          </div>
        </div>
    );
  }
}

export default Therapy;
