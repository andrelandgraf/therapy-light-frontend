export default class TherapyBot {

    constructor(callback){
        this.emotions = [];
        this.playText = callback;
   }

    setEmotions = (emotions) => {
        this.emotions = emotions;
        let sentence = undefined;
        if (emotions.includes("anger") && emotions.includes("sadness")) {
            sentence = "Ozan, Please calm down. You are making Haydar sad.";
        } else if (emotions.includes("anger") || emotions.includes("sadness")) {
            sentence = "Ozan, Please calm down. You are making Haydar sad.";
        } 
        // if (emotions.includes("anger")) {
        //     sentence = sentence + "Ozan, Please calm down. ";
        // } 
        // // if (emotions.includes("contempt")) {
        // //     sentence = sentence + "contempt";
        // // }
        // if (emotions.includes("disgust")) {
        //     sentence = sentence + "Why are you disgusted? ";
        // }
        // // if (emotions.includes("surprise")) {
        // //     sentence = sentence + "surprise";
        // // }
        // if (emotions.includes("sadness")) {
        //     sentence = sentence + "You make Haydar sad.";
        // }
        // // if (emotions.includes("happiness")) {
        // //     sentence = sentence + "happiness";
        // // }
        // // if (emotions.includes("neutral")) {
        // //     sentence = sentence + "neutral";
        // // }
        if (sentence != undefined && this.previousSentence != sentence) {
            console.log(sentence);
            this.playText(sentence);
            this.previousSentence = sentence;
        }
    }

    setRecordedText = (recordedText) => {
        console.log(recordedText);
        if (recordedText.toLowerCase().includes("idiot")) {
            this.playText("Ozan, Watch your language!")
        }
    }
}