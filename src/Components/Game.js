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
            flipped: {},
            timer: '',
            disabled: false
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
        
        const newFlipStatus = this.state.flipped;
        
        this.setState(state =>({
            tempArray: [...this.state.tempArray, item],
            flipped: {
                ...state.flipped,
                [index]: !state.flipped[index]
            },
            disabled: {
                ...state.disabled,
                [index]: true
            }
        }), () => {
            this.cardCounter(this.state.tempArray);
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
        if(cardName) {
            console.log('hooray');
            this.disableClick();
            // add some points
            
        } else if (!cardName && counter == 2) {
            this.checkTempCards(this.state.tempArray);
            // remove some points
        }
    }

    disableClick(index) {
        this.setState(state =>({
            disabled: {
                ...state.disabled,
                [index]: !this.state.disabled
            }
        }));
    }

    checkTempCards(checkCards) {        
        {checkCards.map((item) => {
            this.checkCards(item.indexNumber);
        })};
    }

    checkCards(apple) {
        let cards = document.querySelectorAll('.card');

        for(let i = 0; i < cards.length; i++) {
            if(cards[i].id == apple) {
                this.state.timer = setTimeout(function() {
                    cards[i].classList.remove('flipped');
                        
                    console.log(cards[i]);
                }, 2000);
            }
        }
    }

    render() {
        return (
            <ul>
                <div>
                    <button onClick={() => this.shuffleCard()}>Click</button>
                </div>

                {this.state.cardArray.map((items, index) => (
                    <li className={this.state.flipped[index] ? 'card flipped' : 'card' } key={index} id={index} onClick={() => this.checkCard(items, index)} disabled={this.state.disabled[index] ? 'disabled' : ''} >{items}</li>
                ))}
            </ul>
        )
    }
}

export default Game;