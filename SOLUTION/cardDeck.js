'use strict'

var CardStatuses = {
    ONEDECK: 'onedeck',
    ONHAND: 'onhand',
    ONGAME: 'ongame',
    DISCARD: 'ondiscard'
}

CardStatuses = Object.freeze(CardStatuses);

class CardInitializer {

    static #values = ['6','7','8','9','10', 'V', 'Q', 'K','A'];
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

    static getSuit = (index) => {
        return this.#suit[index];
    }

    static isPossibleSuit = (suit) => {
        if(this.#suit.includes(suit)) {
            return true;
        } else {
            return false;
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

    changeStatus = (newStatus) => {        
        if (this.#status == CardStatuses.ONEDECK) { ////* (в колоде)
            if (newStatus == CardStatuses.ONHAND) {
                this.#status = newStatus;
            } else {
                console.error(`Wrong status - ${newStatus} in changeStatus`);
            }
        } else if (this.#status == CardStatuses.ONHAND) { //// * КАРТА НА РУКАХ
            if (newStatus == CardStatuses.ONGAME) {
                this.#status = newStatus;
            } else if (newStatus == CardStatuses.DISCARD) {
                this.#status = newStatus;
            } else {
                console.error(`Wrong status - ${newStatus} in changeStatus`);
            }
        } else if (this.#status == CardStatuses.ONGAME) { //// * ONGAME - карта выкинута на поле
            if (newStatus == CardStatuses.ONHAND) {
                this.#status = newStatus;
            } else if (newStatus == CardStatuses.DISCARD) {
                this.#status = newStatus;
            } else {
                console.error(`Wrong status - ${newStatus} in changeStatus`);
            }
        } else if (this.#status == CardStatuses.DISCARD) { //// * КАРТА В ОТБОЕ
            if (newStatus == CardStatuses.ONHAND) {
                console.error(`Wrong status - ${newStatus} in changeStatus`);
            } else if (newStatus == CardStatuses.ONEDECK) {
                console.error(`Wrong status - ${newStatus} in changeStatus`);
            } else if (newStatus == CardStatuses.ONGAME) {
                console.error(`Wrong status - ${newStatus} in changeStatus`);
            } 
        }
    }

    changeTrump = (newTrump) => {

        if(CardInitializer.isPossibleSuit(newTrump)) {
            if(this.#cardObj.suit == newTrump) {
                this.#isTrump = true;
                this.#cardObj.points += 100;
            }
        } else {
            console.error('Error. Wrong trump in chengeTrump');
        }

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

    getTrump = () => {
        return this.#isTrump;
    }

    getStatus = () => {
        return this.#status;
    }


}

class CardDeck {
    #cards = [];

    constructor() {
        //// ? инициализация всех карт в конструкторе + определение козыря
        for (let i = 0; i < CardInitializer.getCountCards(); i++){
            this.#cards.push(new Card(CardInitializer.getOneCard(i)));
        }
        
    }

    getCardCount = () => {
        return this.#cards.length;
    }

    getCard = (index) => {
        return this.#cards[index];
    }

    shuffle = () => {
        for (let i = this.#cards.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]]; 
        }
    }

    checkTrump = () => {
        let newTrumpSuit = CardInitializer.getSuit(Math.floor(Math.random() * 4));
        
        for(let i = 0; i < this.#cards.length; i++){
            this.#cards[i].changeTrump(newTrumpSuit);
        }
    }

    reInit = () => {
        this.#cards.length = 0;

        for (let i = 0; i < CardInitializer.getCountCards(); i++){
            this.#cards.push(new Card(CardInitializer.getOneCard(i)));
        }

        this.checkTrump();
    }

    //// * Вывести в консоль колоду карт
    printInConsole = () => {
        for(let c= 0; c < myCardDesk.getCardCount();c++) {
            console.log( `Kартa № ${c}, Масть =  ` + (myCardDesk.getCard(c)).getSuit() + ` VALUE = `  + (myCardDesk.getCard(c)).getValue() 
            + ` points = ` +  (myCardDesk.getCard(c)).getPoints() + ` isTrump = ` +  (myCardDesk.getCard(c)).getTrump());
        }
    }

}


//// ! TEST 
// for(let i =0; i < CardInitializer.getCountCards(); i++)
// {
//     console.log(CardInitializer.getOneCard(i));
// }


//// ! создаем колоду карт   
var myCardDesk = new CardDeck();

console.log("КОЛОДА КАРТ");
myCardDesk.printInConsole();

console.log("Проверка тусования колоды");
myCardDesk.shuffle();
myCardDesk.printInConsole();

console.log("\n\nПроверка изменения козыря (checkTrump)\n");
myCardDesk.checkTrump();
myCardDesk.printInConsole();


console.log("\n\nПроверка пересоздания колоды (reInit)\n");
myCardDesk.reInit();
myCardDesk.printInConsole();


console.log("\n\nПроверка изменения статуса карты в колоде\n");
console.log(myCardDesk.getCard(0));

myCardDesk.getCard(0).changeStatus(CardStatuses.ONHAND);
console.log(myCardDesk.getCard(0));

myCardDesk.getCard(0).changeStatus(CardStatuses.DISCARD);
console.log(myCardDesk.getCard(0));

myCardDesk.getCard(0).changeStatus(CardStatuses.DISCARD);
console.log(myCardDesk.getCard(0));

console.log("Тут будет ОШИБКА, так как карте не может попасть из отбоя в игру!")
myCardDesk.getCard(0).changeStatus(CardStatuses.ONGAME);
console.log(myCardDesk.getCard(0));