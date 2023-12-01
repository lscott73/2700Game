import CardData from '../helpers/carddata.js';

export default class Card { 
    constructor(scene) {
        this.render = (x, y, cardData) => {
            let card = scene.add.image(x, y, cardData.getSprite()).setScale(0.25, 0.25).setInteractive();
            scene.input.setDraggable(card);
            card.setData({cardData: cardData, state: cardData.state});
            return card;
        }
    }
}