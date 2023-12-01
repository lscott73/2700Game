import BackgroundImg from '../assets/bg.png'
import AppleImg from '../assets/apple.png'
import CyanCardBack from '../assets/CyanCardBack.png';
import CyanCardFront from '../assets/CyanCardFront.png';
import MagentaCardBack from '../assets/MagentaCardBack.png';
import MagentaCardFront from '../assets/MagentaCardFront.png';

import Card from '../helpers/card.js';
import CardData from '../helpers/carddata.js';
import Zone from '../helpers/zone.js';
import Dealer from '../helpers/dealer.js';

// todo next, build discard functionality and then build the center board functionality, 
//    tracking which cards are where with arrays of card data objects, 
//    and find some way to get rid of cards on the screen.

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
        this.load.image('magentaCardBack', MagentaCardBack);
        this.load.image('magentaCardFront', MagentaCardFront);
    }

    create() {
        let self = this;
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        //this.add.image(500, 350, 'apple');

        // center board zone, not really a zone
        // this.centerZone = new Zone(this);
        // this.centerBoardZone = this.centerZone.renderZone(500, 170, 700, 200);
        // this.outline = this.centerZone.renderOutline(this.centerBoardZone);
        this.startText = this.add.text(200, 170, ['Employees and Lawsuits Here']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 
        // player board zone
        this.boardZone = new Zone(this);
        this.playerBoardZone = this.boardZone.renderZone(500, 380, 700, 200);
        this.outline = this.boardZone.renderOutline(this.playerBoardZone);
        this.startText = this.add.text(200, 380, ['Player Cards Here']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 
        // player Discard zone
        this.discardZone = new Zone(this);
        this.playerDiscardZone = this.discardZone.renderZone(925, 590, 140, 200);
        this.outline = this.discardZone.renderOutline(this.playerDiscardZone);
        this.startText = this.add.text(870, 590, ['Discard']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 

        // player hand zone, not really a zone
        this.startText = this.add.text(200, 590, ['Player Hand Here']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 

        this.dealer = new Dealer(this);




        // create card with new card class
        this.betterCard = new Card(this);
        this.newestCard = this.betterCard.render(230, 590, new CardData(0, 0, 1, 0, 'cyanCardFront', 0));
        // can edit card data values like this
        this.newestCard.data.values.cashCost = 1;
        // can access card data values like this
        console.log(this.newestCard.data.values.cashCost);

        // create decks:
        // create deck for player
        this.playerDeck = [];
        // create deck for center board
        this.centerDeck = [];

        // add basic cards for player
        for (let i = 0; i < 10; i++) {
            if (i < 5) {
                this.playerDeck.push(new CardData(0, 0, 1, 0, 'cyanCardFront', 0)); // sprite would be 'internSprite' or something
            } else {
                this.playerDeck.push(new CardData(0, 0, 0, 1, 'cyanCardFront', 0)); // sprite would be 'paralegalSprite' or something
            }
            console.log("player deck: add a card with (" + this.playerDeck[i].cashValue + ", " + this.playerDeck[i].leverageValue + ")");
        }
        // shuffle this initial player deck
        self.dealer.shuffle(self.playerDeck);
        // log the shuffled deck
        for (let i = 0; i < 10; i++) {
            console.log("player deck: card " + i + " has (" + self.playerDeck[i].cashValue + ", " + self.playerDeck[i].leverageValue + ")");
        }

        // add cards for center deck
        // probably just 30 this.centerDeck.push(new CardData( details of particular card here ));
        // the following for loop is just for testing
        for (let i = 0; i < 30; i++) {
            let random1 = Math.floor(Math.random() * 4);
            let random2 = Math.floor(Math.random() * 4);
            let random3 = Math.floor(Math.random() * 4);
            let random4 = Math.floor(Math.random() * 4);

            this.centerDeck.push(new CardData(random1, random2, random3, random4, 'magentaCardFront', 0)); // sprite would be 'lawsuitSprite' or something
            console.log("center deck: add a card with (" + this.centerDeck[i].cashValue + ", " + this.centerDeck[i].leverageValue + ")");
        }
        self.dealer.shuffle(self.centerDeck);
        self.dealer.dealCenterCards(self.centerDeck);





        // interactive text emample:
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
        // basic deal cards on click
        this.startText.on('pointerdown', function (pointer) {
            self.dealer.dealPlayerCards(self.playerDeck);
        });




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