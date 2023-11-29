import Card from '../helpers/card.js';
export default class Dealer {
    constructor(scene) {
        this.dealCards = (amount) => {
            // actually deal the cards
            for (let i = 0; i < amount; i++) {
                let playerCard = new Card(scene);
                playerCard.render(250 + i * 120, 590, 'cyanCardFront');
            }

        }
    }

}