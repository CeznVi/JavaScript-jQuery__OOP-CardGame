'use strict'

var CardStatuses = {
    ONEDECK: 'onedeck',
    ONHAND: 'onhand',
    ONGAME: 'ongame',
    DISCARD: 'ondiscard'
}

CardStatuses = Object.freeze(CardStatuses);

class CardInitializer {
    static #values = ['6','7','8','9','19', 'V', 'Q', 'K','A'];
    static #suit = ['♥', '♦' , '♠', '☩'];
    
    static getCountCards = () => {
        return this.#values.length * this.#suit.length;
    }
    static getOneCard = (index) => {
        if(index >= 0 && index < this.getCountCards()) {
            return {
                value: this.#values[index % this.#values.length],
                suit: this.#suit[index % this.#suit.length],
                points: index % this.#values.length + 6
            }
        }
        else {
            console.error("get one Card--incorrect index");
        }
    }


}

//// ! TEST 
// for(let i =0; i < CardInitializer.getCountCards(); i++)
// {
//     console.log(CardInitializer.getOneCard(i));
// }

class Card {
    #cardObj = null;
    #isTrump = false;
    #status = CardStatuses.ONEDECK;

    constructor(cardObj) {
        this.#cardObj = cardObj;
    }

    //// TODO  
    changeStatus = (newStatus) => {

    }

        //// TODO  
    changeTrump = (newTrump) => {

    }

    getValue = () => {
        return this.#cardObj.value;
    }

    getSuit = () => {
        return this.#cardObj.suit;
    }

    getPoints = () => {
        return this.#cardObj.points;
    }

    //// TODO
    getTrump = () => {

    }

    //// TODO  
    getStatus = () => {

    }


}

/// ? SIMPLE
console.log(new Card(CardInitializer.getOneCard(0)));

class CardDeck {
    #cards = [];

    constructor() {
        for (let i = 0; i < CardInitializer.getCountCards(); i++){
            this.#cards.push(new Card(CardInitializer.getOneCard(i)));
        }
    }

    getCard = (index) => {
        return this.#cards[index];
    }

    shuffle = () => {
    
    }

    checkTrump = () => {
        
    }

    reInit = () => {
        
    }


}