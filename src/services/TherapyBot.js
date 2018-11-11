export default class TherapyBot {

    constructor(callback){
        this.emotions = [];
        this.playText = callback;
   }

    setEmotions = (emotions) => {
        this.emotions = emotions;
        let sentence = "";
        if (emotions.includes("fear")) {
            sentence = "fear";
        } else if (emotions.includes("anger")) {
            sentence = "anger";
        } else if (emotions.includes("contempt")) {
            sentence = "contempt";
        } else if (emotions.includes("disgust")) {
            sentence = "disgust";
        } else if (emotions.includes("surprise")) {
            sentence = "surprise";
        } else if (emotions.includes("sadness")) {
            sentence = "sadness";
        } else if (emotions.includes("happiness")) {
            sentence = "happiness";
        } else if (emotions.includes("neutral")) {
            sentence = "neutral";
        }
        console.log(sentence);
        this.playText(sentence);
    }

    setRecordedText = (recordedText) => {
        if (recordedText.toLowerCase().includes("fuck")) {
            this.playText("Language")
        }
    }
}