import Card from '../helpers/card.js';
import CardData from '../helpers/carddata.js';
export default class Dealer {
    constructor(scene) {
        this.dealCards = (x, y, spacing, amount, startDeck, endDeck) => { // deals and tells cards to render, removing them from a deck and adding them to the scene
            // actually deal the cards
            for (let i = 0; i < amount; i++) {
                if (startDeck.length > 0) {
                    let cardData = startDeck[0];
                    // console.log(cardData);
                    this.moveCard(cardData, startDeck, endDeck);
                    let playerCard = new Card(scene);
                    let renderedCard = playerCard.render(x + (endDeck.length - 1) * spacing, y, cardData);
                    scene.discardList.push(renderedCard);
                    //console.log(scene.discardList);
                }
            }
        }

        this.moveCard = (cardData, startDeck, endDeck) => { // moves a particular cardData object out of startDeck and into endDeck
            //console.log("find index? " + startDeck.findIndex((element) => element === cardData));
            let cardIndex = startDeck.findIndex((element) => element === cardData);
            if (cardIndex === -1) {
                console.log("card not found");
                return;
            } else {
                cardData.state = this.stateLookup(endDeck);
                endDeck.push(startDeck[cardIndex]);
                startDeck.splice(cardIndex, 1);
                //console.log(cardData);
                console.log(" ^ card moved, from (" + this.stateLookup(startDeck) + ") start deck (length: " + startDeck.length 
                + "), to (" + this.stateLookup(endDeck) + ") end deck (length: " + endDeck.length + ")");
            }
        }

        this.shuffle = (deck) => { // shuffle the deck
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }

        this.emptyDeckToDeck = (startDeck, endDeck) => { // moves all cards from startDeck to endDeck
            while (startDeck.length > 0) {
                this.moveCard(startDeck[0], startDeck, endDeck);
            }
        }
        
        this.stateLookup = (endDeck) => { // returns the state of the deck
            if (endDeck === scene.centerDeck) {
                return 0;
            } else if (endDeck === scene.centerBoard) {
                return 1;
            } else if (endDeck === scene.centerDiscard) {
                return 2;
            } else if (endDeck === scene.playerDeck) {
                return 3;
            } else if (endDeck === scene.playerDiscard) {
                return 4;
            } else if (endDeck === scene.playerHand) {
                return 5;
            } else if (endDeck === scene.playerBoard) {
                return 6;
            } else if (endDeck === scene.removed) {
                return 7;
            } else {
                return -1;
            }
        }

    }

}