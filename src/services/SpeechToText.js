export default class SpeechToText {

   constructor(callback){
        this.callback = callback;
   }

    listen = () => {
        const SpeechRecognition = window.SpeechRecognition
        || window.webkitSpeechRecognition
        || window.mozSpeechRecognition
        || window.msSpeechRecognition
        || window.oSpeechRecognition
        let speechRecognition = new SpeechRecognition();

        const defaults = {
            continuous: true,
            interimResults: false,
            lang: 'en-US'
          }
        Object.assign(speechRecognition, defaults);
        speechRecognition.addEventListener('result', this.bindResult);
        console.log("start listening...");
        speechRecognition.start();
    }

    stop = () => {
        this.abort();
    }

    bindResult = (event) => {
        let interimTranscript = ''
        let finalTranscript = ''
    
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }
        console.log("InterimTranscript: " + interimTranscript);
        console.log("FinalTranscript: " + finalTranscript);
        this.callback(finalTranscript);
    }

}