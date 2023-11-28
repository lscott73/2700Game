import Card from '../helpers/card.js';
export default class Dealer {
    constructor(scene) {
        this.dealCards = () => {
            let playerSprite;
            let OpponentSprite;
            // determine which card face to use based on player
            if (scene.isPlayerA) {
                playerSprite = 'CyanCardFront';
                OpponentSprite = 'MagentaCardBack';
            } else {
                playerSprite = 'MagentaCardFront';
                OpponentSprite = 'CyanCardBack';

            }
            // actually deal the cards
            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(scene);
                playerCard.render(475 + i * 100, 650, playerSprite);

                let opponentCard = new Card(scene);
                scene.opponentCards.push(opponentCard.render(475 + i * 100, 125, OpponentSprite).disableInteractive());
            }

        }
    }

}