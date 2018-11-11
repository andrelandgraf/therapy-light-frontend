import React from "react";

class Emojis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emojiSources: [],
            colors: ['green', 'blue'],
        }
    }

    updateEmotions = (emotions) => {
        let sources = [];
        emotions.forEach(element => {
            sources.push(element+".png");
        });
        this.setState({emojiSources: sources});
    }

    render() {
        return (
            <div>
            {this.state.emojiSources.map((emojiSrc, i) => <img style={{alignItems: 'center', backgroundColor: this.state.colors[i]}} width="50px" src={emojiSrc}></img>)}
            </div>
        );
    }
}

export default Emojis;