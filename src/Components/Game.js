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
            count: 0,
            score: 0,
            flipped: false
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
            indexNumber: index
        };           
    
        this.setState({
            tempArray: [...this.state.tempArray, item],
            flipped: !this.state.flipped
        }, () => {
            this.cardCounter(this.state.tempArray)
        });
    }

    cardCounter(item) {
        this.setState({
            count: this.state.count + 1
        }, () => {
            this.checkCoupleCards(item, this.state.count);
            if(item.length > 1) {
                this.setState({
                    count: 0,
                    tempArray: []
                })
            } else {
            //    console.log('hello')
            }
        });
    }

    checkCoupleCards(item, counter) {
        let valueArr = item.map(function(keyName, i) {
            return keyName.name;
        });

        let isDuplicate = valueArr.some(function(keyName, index) {
            return valueArr.indexOf(keyName) !== index;
        });

        this.duplicationCheck(isDuplicate, counter);
    }

    duplicationCheck(cardName, counter) {
        console.log(counter)
        if(cardName) {
            console.log('hooray');
            // add some points
        } else if (!cardName && counter === 2) {
            console.log('no try again');
            // remove some points
        }
        console.log(this.state.tempArray);
    }

    render() {
        return (
            <ul>
                <button onClick={() => this.shuffleCard()}>Click</button>
                {this.state.cardArray.map((items, index) => (
                    <li className={`card ${this.state.flipped}`} key={index} onClick={() => this.checkCard(items, index)}>{items}</li>
                ))}
            </ul>
        )
    }
}

export default Game;