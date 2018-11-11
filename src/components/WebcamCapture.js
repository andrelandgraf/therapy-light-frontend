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

    componentDidMount = () => {
      setTimeout(() => {
        this.inverval = setInterval(async () => {
          this.capture();
        }, 3000);
      }, 1000);
}

  componentWillUnmount = () => {
    // use intervalId from the state to clear the interval
    clearInterval(this.inverval);
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.send(imageSrc);
    // console.log(imageSrc);
  };

  send = (imageData) => {
    const faceBox = document.getElementById("facebox");
    const faceBox2 = document.getElementById("facebox2");
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
      if (Array.isArray(jsonArray)) {
      jsonArray = jsonArray.slice(0,2);
      let emotions = [];
      let faceRectangles = [];
      if (jsonArray.length < 1) {
        faceBox.style.cssText = `
              width: 0px;
              height: 0px;
              top: 0px;
              left: 0px;
              border-width: 0px;
            `;
      }
      if (jsonArray.length < 2) {
        faceBox2.style.cssText = `
              width: 0px;
              height: 0px;
              top: 0px;
              left: 0px;
              border-width: 0px;
            `;
      }
      jsonArray.forEach(element => {
        let {emotion} = element.faceAttributes
        emotion = Object.keys(emotion).reduce(function(a, b){ return emotion[a] > emotion[b] ? a : b });
        emotions.push(emotion);
        faceRectangles.push(element.faceRectangle);
        if (faceRectangles.length > 0) {
          const { width, height, top, left } = faceRectangles[0];
          faceBox.style.cssText = `
              position: absolute;
              z-index:999999 !important;
              width: ${width + 10}px;
              height: ${height + 30}px;
              top: ${top + 325}px;
              left: ${left + 540}px;
              border-style: solid;
              border-width: 2px;
              color: green;
            `;
        }
        if (faceRectangles[1]) {
          const { width, height, top, left } = faceRectangles[1];

          faceBox2.style.cssText = `
              position: absolute;
              z-index:999999 !important;
              width: ${width + 10}px;
              height: ${height + 30}px;
              top: ${top + 325}px;
              left: ${left + 540}px;
              border-style: solid;
              border-width: 2px;
              color: blue;
            `;
        } 
      });
      this.props.setEmotions(emotions)
    } else {
        faceBox.style.cssText = `
              width: 0px;
              height: 0px;
              top: 0px;
              left: 0px;
              border-width: 0px;
            `;
        faceBox2.style.cssText = `
              width: 0px;
              height: 0px;
              top: 0px;
              left: 0px;
              border-width: 0px;
            `;
    }
  });
}

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
        <div className="facebox" id="facebox"> </div>
        <div className="facebox2" id="facebox2"> </div>
      </div>
    );
  }
}

export default WebcamCapture;