import CardData from '../helpers/carddata.js';

export default class Card { 
    constructor(scene) {
        this.render = (x, y, cardData) => {
            let card = scene.add.image(x, y, cardData.getSprite()).setScale(0.25, 0.25).setInteractive();
            scene.input.setDraggable(card);
            card.setData({cashCost: cardData.getCashCost(), leverageCost: cardData.getLeverageCost(), 
                cashValue: cardData.getCashValue(), leverageValue: cardData.getLeverageValue(), 
                sprite: cardData.getSprite(), active: cardData.getActive()});
            return card;
        }
    }
}