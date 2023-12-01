import Card from '../helpers/card.js';
import CardData from '../helpers/carddata.js';
export default class Dealer {
    constructor(scene) {
        this.dealCards = (x, y, spacing, amount, deck) => { // deals and tells cards to render, removing them from a deck and adding them to the scene
            // actually deal the cards
            for (let i = 0; i < amount; i++) {
                if (deck.length > 0) {
                    let cardData = deck.pop();
                    console.log(cardData);
                    console.log(deck.length);
                    let playerCard = new Card(scene);
                    playerCard.render(x + i * spacing, y, cardData);
                }
            }
        }

        this.moveCard = (cardData, startDeck, endDeck) => { // moves a card to a new location
            console.log("find index? " + startDeck.findIndex((element) => element === cardData));
            let cardIndex = startDeck.findIndex((element) => element === cardData);
            if (cardIndex === -1) {
                console.log("card not found");
                return;
            } else {
                endDeck.push(startDeck[cardIndex]);
                startDeck.pop(cardIndex);
            }
        }

        this.shuffle = (deck) => { // shuffle the deck
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }

        this.combineDecks = (deck, deckToEmpty) => { // combine decks
            deck = deck.concat(deckToEmpty);
            deckToEmpty = [];
        }

        this.dealPlayerCards = (deck) => {
            // deal cards to player
            this.dealCards(250, 590, 120, 5, deck);
        }
        
        this.dealCenterCards = (deck) => {
            // deal cards to player
            this.dealCards(220, 170, 140, 5, deck);
        }
    }

}