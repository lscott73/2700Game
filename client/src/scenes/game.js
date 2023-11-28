import CyanCardBack from '../assets/CyanCardBack.png';
import CyanCardFront from '../assets/CyanCardFront.png';
import MagentaCardBack from '../assets/MagentaCardBack.png';
import MagentaCardFront from '../assets/MagentaCardFront.png';

import Card from '../helpers/card.js';


export default class Game extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
    }

    preload() {
        this.load.image('CyanCardBack', CyanCardBack);
        this.load.image('CyanCardFront', CyanCardFront);
        this.load.image('MagentaCardBack', MagentaCardBack);
        this.load.image('MagentaCardFront', MagentaCardFront);

    }

    create() {
        // for use within the inner functions below
        let self = this;

        // adds the card image as an interactive object
        this.card = this.add.image(300, 300, 'CyanCardFront').setScale(0.3, 0.3).setInteractive();
        //makes the card a draggable object
        this.input.setDraggable(this.card);

        this.dealCards = () => {
            console.log('deal cards');
            for (let i = 0; i < 5; i++) {
                let playerCard = new Card(this);
                playerCard.render(475 + i * 100, 650, 'CyanCardFront');
            }
        }

        // creates text
        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive(); 

        // on click for deal cards
        this.dealText.on('pointerdown', function (pointer) {
            self.dealCards();
        });

        // color change while hovering over text
        this.dealText.on('pointerover', function (pointer) {
            self.dealText.setColor('#ff69b4');
        });
        // color change back to original
        this.dealText.on('pointerout', function (pointer) {
            self.dealText.setColor('#00ffff');
        });

        // allows basic dragging for gameobjects
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }

    update() {

    }
}