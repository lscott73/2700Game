import BackgroundImg from '../assets/bg.png'
import AppleImg from '../assets/apple.png'
import CyanCardBack from '../assets/CyanCardBack.png';
import CyanCardFront from '../assets/CyanCardFront.png';
import MagentaCardBack from '../assets/MagentaCardBack.png';
import MagentaCardFront from '../assets/MagentaCardFront.png';

import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';



const sizes = {
    width: 1000,
    height: 700
}

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        this.load.image('background', BackgroundImg);
        //this.load.image('apple', AppleImg);
        this.load.image('cyanCardBack', CyanCardBack);
        this.load.image('cyanCardFront', CyanCardFront);
    }

    create() {
        let self = this;
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        //this.add.image(500, 350, 'apple');

        // center board zone
        this.centerZone = new Zone(this);
        this.centerBoardZone = this.centerZone.renderZone(500, 170, 700, 200);
        this.outline = this.centerZone.renderOutline(this.centerBoardZone);
        this.startText = this.add.text(200, 170, ['Employees and Lawsuits Here']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 
        // player board zone
        this.boardZone = new Zone(this);
        this.playerBoardZone = this.boardZone.renderZone(500, 380, 700, 200);
        this.outline = this.boardZone.renderOutline(this.playerBoardZone);
        this.startText = this.add.text(200, 380, ['Player Cards Here']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 
        // player hand zone
        this.handZone = new Zone(this);
        this.playerHandZone = this.handZone.renderZone(500, 590, 700, 200);
        this.outline = this.handZone.renderOutline(this.playerHandZone);
        this.startText = this.add.text(200, 590, ['Player Hand Here']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 




        // text emample:
        // creates text
        this.startText = this.add.text(50, 350, [' END \nTURN']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive(); 
        // color change while hovering over text
        this.startText.on('pointerover', function (pointer) {
            self.startText.setColor('#ff69b4');
        });
        // color change back to original
        this.startText.on('pointerout', function (pointer) {
            self.startText.setColor('#00ffff');
        });



        // card example:
        // creates cards
        this.newCard = this.add.image(0, 0, 'cyanCardBack').setScale(0.25).setInteractive();
        this.newerCard = this.add.image(150, 0, 'cyanCardFront').setScale(0.25).setInteractive();
        // makes cards a draggable object
        this.input.setDraggable(this.newCard);
        this.input.setDraggable(this.newerCard);

        // create card with new card class
        this.betterCard = new Card(this);
        this.newestCard = this.betterCard.render(300, 0, 'cyanCardBack');
        // can edit card data values like this
        this.newestCard.data.values.cashCost = 1;
        // can access card data values like this
        console.log(this.newestCard.data.values.cashCost);



        // event handling:
        // handle drag events
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        // handle card pickup events
        this.input.on('dragstart', function (pointer, gameObject) {
            // tint on drag
            gameObject.setTint(0xffff69);
            // top on drag
            self.children.bringToTop(gameObject);
        });
        // handle card drop events
        this.input.on('dragend', function (pointer, gameObject, dropped) {
            // tint back to normal on drop --- not working, added it to this.input.on('drop') instead
            gameObject.setTint();
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            // tint back to normal on drop --- not working, added it to this.input.on('drop') instead
            gameObject.setTint();
            // make sure it is dropped in a drop zone
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            // some type of switch statement to check which zone a given card is being dropped into
            if (dropZone === self.playerBoardZone) {
                // set data for dropzone
                dropZone.data.values.cards++;
                // set card position to dropzone position
                gameObject.x = dropZone.x - 350 + (dropZone.data.values.cards * 80);
                gameObject.y = dropZone.y;

                // reset tint here i guess?
                gameObject.setTint();
                // disable card dragging
                gameObject.disableInteractive();
            }



        });
    }

    update() {

    }
}