import Card from '../helpers/card.js';
import CardData from '../helpers/carddata.js';
export default class Dealer {
    constructor(scene) {
        this.dealCards = (amount, deck) => {
            // actually deal the cards
            for (let i = 0; i < amount; i++) {
                if (deck.length > 0) {
                    let cardData = deck.pop();
                    console.log(cardData);
                    console.log(deck.length);
                    let playerCard = new Card(scene);
                    playerCard.render(250 + i * 120, 590, cardData);
                }
            }
        }
        this.shuffle = (deck) => {
            // shuffle the deck
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
        }
        this.combineDecks = (deck, deckToEmpty) => {
            // combine decks
            deck = deck.concat(deckToEmpty);
            deckToEmpty = [];
        }
    }

}