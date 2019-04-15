import React, { Component } from 'react';
// import { timingSafeEqual } from 'crypto';

class Game extends Component {
    constructor(props) {
    super(props);

        this.state = {
            memoryCards: ['mario', 'luigi', 'browser', 'peach', 'wario', 'toad', 'yoshi', 'bowser-junior', 'waluigi', 'diddy-kong-jr' ],
            cardArray: [],
            newArray: [],
            tempArray: [],
            arrayHere: [],
            count: 0
        }
    }

    shuffleCard() {
        this.setState({
            cardArray: [...this.state.memoryCards, ...this.state.memoryCards]
        }, () => {
            this.setState({
                newArray: this.state.cardArray.sort(() => 0.5 - Math.random())
            })
        })
    }

    checkCard(cardName, index) {
        const item = {
            name: cardName,
            indexNumber: index,
            flipped: true
        };             
    
        this.setState({
            tempArray: [...this.state.tempArray, item]
        }, () => {
            this.cardCounter(this.state.tempArray)
        });
    }

    cardCounter(item) {
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log(item)
            this.checkCoupleCards(item)
            if(this.state.count > 1) {
                this.setState({
                    count: 0,
                    tempArray: []
                })
            } else {
            //    console.log('hello')
            }
        });
    }

    checkCoupleCards(item) {
        // item
        item.map((keyName, i ) => ({
        }, this.checkMatch(keyName.name, keyName.indexNumber)))
    }


    checkMatch(cardName, duplicationCheck) {
        console.log(cardName, duplicationCheck);
    }

    render() {
        return (
            <ul>
                <button onClick={() => this.shuffleCard()}>Click</button>
                {this.state.cardArray.map((items, index) => (
                    <li className="card" key={index} onClick={() => this.checkCard(items, index)}>{items}</li>
                ))}
            </ul>
        )
    }
}

export default Game;