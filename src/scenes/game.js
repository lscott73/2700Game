import BackgroundImg from '../assets/bg.png'
import AppleImg from '../assets/apple.png'
import CyanCardBack from '../assets/CyanCardBack.png';
import ExampleCardFront from '../assets/ExampleCardFront.png';
import MagentaCardBack from '../assets/MagentaCardBack.png';
import MagentaCardFront from '../assets/MagentaCardFront.png';

import Card from '../helpers/card.js';
import CardData from '../helpers/carddata.js';
import Zone from '../helpers/zone.js';
import Dealer from '../helpers/dealer.js';


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
        this.load.image('cxampleCardFront', ExampleCardFront);
        this.load.image('magentaCardBack', MagentaCardBack);
        this.load.image('magentaCardFront', MagentaCardFront);
    }

    create() {
        let self = this;
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        //this.add.image(500, 350, 'apple');

        // center board zone, not really a zone
        this.startText = this.add.text(200, 170, ['Employees and Lawsuits Here']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 
        // player board zone
        this.boardZone = new Zone(this);
        this.playerBoardZone = this.boardZone.renderZone(500, 380, 700, 200);
        this.outline = this.boardZone.renderOutline(this.playerBoardZone);
        this.startText = this.add.text(200, 380, ['Player Cards Here']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 
        this.startText = this.add.text(870, 590, ['Discard']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 
        // player hand zone
        this.handZone = new Zone(this);
        this.playerHandZone = this.handZone.renderZone(500, 590, 700, 200);
        this.outline = this.handZone.renderOutline(this.playerHandZone);
        this.startText = this.add.text(200, 590, ['Player Hand Here']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#0000000'); 

        this.dealer = new Dealer(this);


        // temp text example: just for testing
        this.tempText = this.add.text(50, 20, ['TEMPORARY TEXT']).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();


        // create decks:
        // create deck for player
        this.playerDeck = [];
        // create deck for center board
        this.centerDeck = [];

        // create board areas:
        // create board area for player hand
        this.playerHand = [];
        // create board area for player board
        this.playerBoard = [];
        // create board area for center board
        this.centerBoard = [];
        // create board area for player discard
        this.playerDiscard = [];
        // create board area for center discard
        this.centerDiscard = [];
        // create array for any removed cards, may not need in final game
        this.removed = [];

        //create player pools
        this.powerPool = 10;
        this.leveragePool = 0;
        this.cashPool = 0;
        // create text for player pools:
        this.powerText = this.add.text(900, 20, this.powerPool).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#ffff00');
        this.leverageText = this.add.text(900, 120, this.leveragePool).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#ff0000');
        this.cashText = this.add.text(900, 220, this.cashPool).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ff00');

        // create discarding array:
        this.discardList = [];




        // add basic cards for player
        for (let i = 0; i < 10; i++) {
            if (i < 5) {
                this.playerDeck.push(new CardData(0, 0, 1, 0, 0, 0, 'cxampleCardFront', 3)); // sprite would be 'internSprite' or something
            } else {
                this.playerDeck.push(new CardData(0, 0, 0, 1, 0, 0, 'cxampleCardFront', 3)); // sprite would be 'paralegalSprite' or something
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
            let random5 = Math.floor(Math.random() * 4);

            this.centerDeck.push(new CardData(random1, random2, random3, random4, random1, 0, 'magentaCardFront', 0)); // sprite would be 'lawsuitSprite' or something
            console.log("center deck: add a card with (" + this.centerDeck[i].cashValue + ", " + this.centerDeck[i].leverageValue + ")");
        }
        self.dealer.shuffle(self.centerDeck);
        self.dealer.dealCards(220, 170, 140, 5, self.centerDeck, self.centerBoard);





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

        // end turn and start new turn!
        this.startText.on('pointerdown', function (pointer) {
            // end of turn actions:
            // discard cards

            // send player hand to discard
            self.dealer.emptyDeckToDeck(self.playerHand, self.playerDiscard);
            

            // send player board to discard -- can't use empty deck since some cards go to the center discard while most go to the player discard
            let boardAmount = self.playerBoard.length;
            for (let i = 0; i < boardAmount; i++) {
                if (self.playerBoard[0].leverageCost > 0) {
                    self.dealer.moveCard(self.playerBoard[0], self.playerBoard, self.centerDiscard);
                } else {
                    self.dealer.moveCard(self.playerBoard[0], self.playerBoard, self.playerDiscard);
                }
            }

            // send center board to discard
            self.dealer.emptyDeckToDeck(self.centerBoard, self.centerDiscard);

            // handle discard visuals
            while (self.discardList.length > 0) {
                console.log("destroying a card");
                self.discardList[0].destroy(true);
                self.discardList.splice(0, 1);
            }
            self.playerBoardZone.data.values.cards = 0;



            // start of turn actions:
            
            // deal cards to player
            if (self.playerDeck.length < 5) {
                let deckAmount = self.playerDeck.length;
                let drawAfterShuffle = 5 - deckAmount;
                self.dealer.dealCards(250, 590, 120, deckAmount, self.playerDeck, self.playerHand);
                // shuffle player discard into player deck
                self.dealer.emptyDeckToDeck(self.playerDiscard, self.playerDeck);
                self.dealer.shuffle(self.playerDeck);
                // then deal remaining amount of cards
                self.dealer.dealCards(250, 590, 120, drawAfterShuffle, self.playerDeck, self.playerHand);
            } else {
                self.dealer.dealCards(250, 590, 120, 5, self.playerDeck, self.playerHand);
            }

            // deal cards to center
            if (self.centerDeck.length < 5) {
                let deckAmount = self.centerDeck.length;
                let drawAfterShuffle = 5 - deckAmount;
                self.dealer.dealCards(220, 170, 140, deckAmount, self.centerDeck, self.centerBoard);
                // shuffle center discard into center deck
                self.dealer.emptyDeckToDeck(self.centerDiscard, self.centerDeck);
                self.dealer.shuffle(self.centerDeck);
                // then deal remaining amount of cards
                self.dealer.dealCards(220, 170, 140, drawAfterShuffle, self.centerDeck, self.centerBoard);
            } else {
                self.dealer.dealCards(220, 170, 140, 5, self.centerDeck, self.centerBoard);
            }


            // temp logs
            console.log("player hand length: " + self.playerHand.length);
            // console.log(self.playerHand);
            console.log("player deck length: " + self.playerDeck.length);
            console.log("player discard length: " + self.playerDiscard.length);
            // console.log(self.playerDiscard);
            console.log("center board length: " + self.centerBoard.length);
            console.log("center deck length: " + self.centerDeck.length);
            console.log("center discard length: " + self.centerDiscard.length);
            console.log("player board length: " + self.playerBoard.length);


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
            console.log("Setting this card down in the player board:");
            console.log(gameObject.data.values.cardData);
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            // tint back to normal on drop --- not working, added it to this.input.on('drop') instead
            gameObject.setTint();
            console.log("Setting this card down in the player board:");
            // make sure it is dropped in a drop zone
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            // lots of game logic will need to happen in here!

            // get card data
            let thisCard = gameObject.data.values.cardData;
            console.log("this card is being dropped:");
            console.log(thisCard);
            // reset tint from drag
            gameObject.setTint();


            // some type of switch statement to check which zone a given card is being dropped into
            if (dropZone === self.playerBoardZone && thisCard.state === 5) { // play from hand to board

                // set data for dropzone
                dropZone.data.values.cards++;
                // set card position to dropzone position
                gameObject.x = dropZone.x - 310 + (dropZone.data.values.cards * 40);
                gameObject.y = dropZone.y;
                // disable card dragging
                gameObject.disableInteractive();
                // move card from player hand to player board
                console.log("moving a card from state: " + gameObject.data.values.cardData.state);
                self.dealer.moveCard(gameObject.data.values.cardData, self.playerHand, self.playerBoard);
                console.log("to state: " + gameObject.data.values.cardData.state);
                console.log(gameObject.data.values.cardData);

                // add car bonuses to player pools
                self.powerPool += thisCard.powerValue;
                self.leveragePool += thisCard.leverageValue;
                self.cashPool += thisCard.cashValue;

                //gameObject.destroy(true);
            } else if (dropZone === self.playerBoardZone && thisCard.state === 1) { // purchase card from board
                if (self.cashPool >= thisCard.cashCost && self.leveragePool >= thisCard.leverageCost) {

                    self.cashPool -= thisCard.cashCost;
                    self.leveragePool -= thisCard.leverageCost;
                    console.log("purchasing a card from state: " + gameObject.data.values.cardData.state);
                    // set data for dropzone
                    dropZone.data.values.cards++;
                    // set card position to dropzone position
                    gameObject.x = dropZone.x - 310 + (dropZone.data.values.cards * 40);
                    gameObject.y = dropZone.y;
                    // disable card dragging
                    gameObject.disableInteractive();
                    // move card from player hand to player board
                    self.dealer.moveCard(gameObject.data.values.cardData, self.centerBoard, self.playerBoard);
                    console.log(gameObject.data.values.cardData);

                } else {

                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;
                    console.log("not enough cash or leverage to purchase this card");
                }

            } else if (dropZone === self.playerHandZone && thisCard.state === 5) {

            } else {
                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;
            }
        });
    }

    update() {
        // update loop
        // may only be needed for updating text and numbers on screen!
        // here are some temp examples:
        this.tempText.setText(this.playerDeck.length + " cards in player deck");
        if(this.playerDeck.length === 5) {
            this.tempText.setText("5 cards? imagine that");
        }


        this.powerText.setText("*" + this.powerPool);
        this.leverageText.setText("!" + this.leveragePool);
        this.cashText.setText("$" + this.cashPool);
    }
}