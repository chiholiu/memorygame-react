import React, { Component } from 'react';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memoryCards: ['mario', 'luigi', 'browser', 'peach', 'wario', 'toad', 'yoshi', 'bowser-junior', 'waluigi', 'diddy-kong-jr' ]
        }
    }

    render() {
        let doubledMemoryCards = [...this.state.memoryCards, ...this.state.memoryCards];
        let shuffledMemoryCards = doubledMemoryCards.sort(() => Math.random() - 0.5);
       
        return (
            <div>
                <ul>
                   {shuffledMemoryCards.map((items, index) => (
                       <li key={index}>{items}</li>
                   ))}
                </ul>
            </div>
        )
    }
}

export default Game;