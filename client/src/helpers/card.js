export default class Card { 
    constructor(scene) {
        this.render = (x, y, image) => {
            let card = scene.add.image(x, y, image).setScale(0.3, 0.3).setInteractive();
            scene.input.setDraggable(card);
            return card;
        }
    }
}