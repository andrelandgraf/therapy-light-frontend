import React from 'react';
import '../styles/VideoCanvas.css';

class VideoCanvas extends React.Component { 

    componentDidUpdate(){
        const { stream } = this.props;
        console.log(stream);
        const video = document.querySelector("#video-element");
        if(stream !== undefined){
            video.srcObject = stream;
        }
    }
    
    render(){
        return (
            <div id="video-container">
                <video autoPlay={true} id="video-element"></video>
            </div>
        );
    }
}

export default VideoCanvas;