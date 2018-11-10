import React from 'react';
import '../styles/VideoCanvas.css';

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

class VideoCanvas extends React.Component { 
    componentDidUpdate(){
        const { stream } = this.props;
        console.log(stream);
        const video = document.querySelector("#video-element");
        if(stream !== undefined){
            video.srcObject = stream;
        }
    
    }
    capture = () => {
        let canvas = document.getElementById('canvas');
        canvas.style.display = "none";
        let video = document.getElementById('video-element');
        const context = canvas.getContext('2d');
        canvas.width = '500';
        canvas.height = '375';
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/png');
        this.send(data);
        console.log(data)
}
    makeblob = (dataURL) => {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) === -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = decodeURIComponent(parts[1]);
            return new Blob([raw], { type: contentType });
        }
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }
    send = (imageData) => {
        const options = {
            uri: uriBase,
            qs: params,
            body: '{"url": ' + '"' + this.makeblob(imageData) + '"}',
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
            let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
            console.log('JSON Response\n');
            console.log(jsonResponse);
        });
    }
    
    render(){
        return (
            <div id="video-container">
                <video autoPlay={true} id="video-element"></video>
                <canvas id="canvas">
                </canvas>
                <input type="button" id="anan" onClick={this.capture} />
            </div>
        );
    }
}

export default VideoCanvas;