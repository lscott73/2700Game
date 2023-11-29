export default class Card { 
    constructor(scene) {
        this.render = (x, y, image) => {
            let card = scene.add.image(x, y, image).setOrigin(0, 0).setScale(0.25, 0.25).setInteractive();
            scene.input.setDraggable(card);

            card.setData({cashCost: 0, leverageCost: 0, cashValue: 0, leverageValue: 0});
            console.log(card.data.values.cashCost);

            return card;
        }
    }
}