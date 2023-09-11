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

class Card {
    #cardObj = null;
    #isTrump = false;
    #status = CardStatuses.ONEDECK;

    constructor(cardObj) {
        this.#cardObj = cardObj;
    }

    //// TODO  
    changeStatus = (newStatus) => {
        //// ! сделать кучу проверок в плане карта из отбоя не может попасть в игру и не может попасть в руки.
        
        // if(newStatus == CardStatuses) {
        //     this.#cardObj.status = newStatus;
        // } else {
        //     console.error('Erorr in change status');
        // }
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
        return this.#isTrump;
    }

    //// TODO  
    getStatus = () => {
        return this.#status;
    }


}

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

//// ! TEST 
// for(let i =0; i < CardInitializer.getCountCards(); i++)
// {
//     console.log(CardInitializer.getOneCard(i));
// }


//// ! TEST   
//console.log(new Card(CardInitializer.getOneCard(0)).getSuit());

//// ? создаем колоду карт
var myCardDesk = new CardDeck();
//// * ТЕСТ метода getCard
console.log("Kартa 0 ="); 
console.log(myCardDesk.getCard(0));

console.log( "Масть карты 0 = "  + (myCardDesk.getCard(0)).getSuit() );
console.log( "VALUE карты 0 = "  + (myCardDesk.getCard(0)).getValue() );
console.log( "POINTS карты 0 = "  + (myCardDesk.getCard(0)).getPoints() );
console.log("Козырная ли карта 0 = " + (myCardDesk.getCard(0).getTrump()));
console.log( "Текущий статус карты 0 = "  + (myCardDesk.getCard(0)).getStatus() );
