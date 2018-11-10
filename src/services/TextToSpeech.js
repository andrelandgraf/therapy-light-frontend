export default class TextToSpeech {
    say = (string) => {
        const voiceAndTextObject = new SpeechSynthesisUtterance(string);
        voiceAndTextObject.voice = window.speechSynthesis.getVoices()[0];
        window.speechSynthesis.speak(voiceAndTextObject);
    }
}