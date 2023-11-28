import CyanCardBack from '../assets/CyanCardBack.png';
import CyanCardFront from '../assets/CyanCardFront.png';
import MagentaCardBack from '../assets/MagentaCardBack.png';
import MagentaCardFront from '../assets/MagentaCardFront.png';

import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';


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

        // create new instance of zone class
        this.zone = new Zone(this);
        // create new dropzone and outline for dropzone
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

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

        this.input.on('dragstart', function (pointer, gameObject) {
            // tint on drag
            gameObject.setTint(0xffff69);
            // top on drag
            self.children.bringToTop(gameObject);
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            // tint back to normal on drop
            gameObject.setTint();
            // make sure it is dropped in a drop zone
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            // set data for dropzone
            dropZone.data.values.cards++;
            // set card position to dropzone position
            gameObject.x = dropZone.x - 350 + dropZone.data.values.cards * 50;
            gameObject.y = dropZone.y;
            // disable card dragging
            gameObject.disableInteractive();
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