import Card from '../helpers/card.js';
export default class Dealer {
    constructor(scene) {
        this.dealCards = () => {
            // actually deal the cards
            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(scene);
                playerCard.render(250 + i * 120, 590, 'cyanCardFront');
            }

        }
    }

}