import React from "react";
import Webcam from "react-webcam";

const request = require('request');

const subscriptionKey = 'f27ab23e24ad419aaa7b8f5acd49b5b6';

const uriBase = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect';

// Request parameters.
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

class WebcamCapture extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.send(imageSrc);
    // console.log(imageSrc);
  };

  send = (imageData) => {
    const options = {
      uri: uriBase,
      qs: params,
      body: this.convertDataURIToBinary(imageData),
      headers: {
          processData: false,
          'Content-Type': 'application/octet-stream',
          'Ocp-Apim-Subscription-Key': subscriptionKey
      }
    };

    request.post(options, (error, response, body) => {
      if (error) {
          console.log('Error: ', error);
          return;
      }
      let jsonArray = JSON.parse(body);
      console.log(jsonArray);
      jsonArray = jsonArray.slice(0,2);
      let emotions = [];
      let faceRectangles = [];
      jsonArray.forEach(element => {
        let {emotion} = element.faceAttributes
        emotion = Object.keys(emotion).reduce(function(a, b){ return emotion[a] > emotion[b] ? a : b });
        emotions.push(emotion);
        faceRectangles.push(element.faceRectangle);
      });
      this.props.setEmotions(emotions)
    });
  };

  convertDataURIToBinary = (dataURI) => {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  render() {
    const videoConstraints = {
      width: 2560,
      height: 1440,
      facingMode: "user"
    };

    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/png"
          screenshotQuality={1.0}
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
  }
}

export default WebcamCapture;