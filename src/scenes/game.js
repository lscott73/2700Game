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

// unicode: power: 235A, leverage: 23C8, cash: 0024, arrow: 21E2


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
        this.startText = this.add.text(200, 170, ['Employees and Lawsuits Here']).setFontSize(32).setFontFamily('Balthazar').setColor('#0000000'); 
        // player board zone
        this.boardZone = new Zone(this);
        this.playerBoardZone = this.boardZone.renderZone(500, 380, 700, 200);
        this.outline = this.boardZone.renderOutline(this.playerBoardZone);
        this.startText = this.add.text(200, 380, ['Player Cards Here']).setFontSize(32).setFontFamily('Balthazar').setColor('#0000000'); 
        // player hand zone
        this.handZone = new Zone(this);
        this.playerHandZone = this.handZone.renderZone(500, 590, 700, 200);
        this.outline = this.handZone.renderOutline(this.playerHandZone);
        this.startText = this.add.text(200, 590, ['Player Hand Here']).setFontSize(32).setFontFamily('Balthazar').setColor('#0000000'); 

        this.dealer = new Dealer(this);


        // deckText for tracking deck size
        this.deckText = this.add.text(10, 670, ['DECK: 0']).setFontSize(24).setFontFamily('Balthazar').setColor('#fbbb21').setInteractive();
        this.discardText = this.add.text(860, 670, ['DISCARD: 0']).setFontSize(24).setFontFamily('Balthazar').setColor('#fbbb21').setInteractive();


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
        this.powerPool = 20;
        this.leveragePool = 0;
        this.cashPool = 0;
        // create text for player pools:
        this.powerText = this.add.text(890, 280, this.powerPool).setFontSize(32).setFontFamily('Balthazar').setColor('#5ce1e6');
        this.leverageText = this.add.text(890, 360, this.leveragePool).setFontSize(32).setFontFamily('Balthazar').setColor('#ff3131');
        this.cashText = this.add.text(890, 440, this.cashPool).setFontSize(32).setFontFamily('Balthazar').setColor('#7ed957');

        // create discarding array:
        this.discardList = [];

        // creat a turn counter, for funsies
        this.turnCounter = 1;
        this.turnCounterText = this.add.text(10, 10, "TURN " +this.turnCounter).setFontSize(32).setFontFamily('Balthazar').setColor('#fbbb21');


        // create cardData objects:
        // add basic cards for player
        for (let i = 0; i < 8; i++) {
            if (i < 4) {
                this.playerDeck.push(new CardData(0, 0, 1, 0, 0, 0, 'cxampleCardFront', 3)); // sprite would be 'internSprite' or something
            } else {
                this.playerDeck.push(new CardData(0, 0, 0, 1, 0, 0, 'cxampleCardFront', 3));
            }
            console.log("player deck: add a card with (" + this.playerDeck[i].cashValue + ", " + this.playerDeck[i].leverageValue + ")");
        }
        // shuffle this initial player deck
        self.dealer.shuffle(self.playerDeck);

        //add cards to center deck
        let j = 0;
        while (j < 2) { // add two of each type of card
            this.centerDeck.push(new CardData(1, 0, 2, 0, 0, 0, 'magentaCardFront', 0)); // Businessfish1
            this.centerDeck.push(new CardData(2, 0, 2, 1, 0, 0, 'magentaCardFront', 0)); // Businessfish2
            this.centerDeck.push(new CardData(3, 0, 3, 0, 0, 0, 'magentaCardFront', 0)); // Businessfish3
            this.centerDeck.push(new CardData(4, 0, 3, 1, 0, 0, 'magentaCardFront', 0)); // Businessfish4
            this.centerDeck.push(new CardData(5, 0, 5, 0, 0, 0, 'magentaCardFront', 0)); // Businessfish5
            this.centerDeck.push(new CardData(6, 0, 4, 3, 0, 0, 'magentaCardFront', 0)); // Businessfish6
            this.centerDeck.push(new CardData(8, 0, 8, 2, 0, 0, 'magentaCardFront', 0)); // Businessfish7
            this.centerDeck.push(new CardData(10, 0, 9, 3, 0, 0, 'magentaCardFront', 0)); // Businessfish8
            this.centerDeck.push(new CardData(1, 0, 0, 1, 1, 0, 'magentaCardFront', 0)); // Lawfish1
            this.centerDeck.push(new CardData(2, 0, 0, 2, 0, 0, 'magentaCardFront', 0)); // Lawfish2
            this.centerDeck.push(new CardData(4, 0, 0, 2, 1, 0, 'magentaCardFront', 0)); // Lawfish3
            this.centerDeck.push(new CardData(5, 0, 0, 3, 0, 0, 'magentaCardFront', 0)); // Lawfish4
            this.centerDeck.push(new CardData(6, 0, 0, 4, 1, 0, 'magentaCardFront', 0)); // Lawfish5
            this.centerDeck.push(new CardData(7, 0, 0, 4, 2, 0, 'magentaCardFront', 0)); // Lawfish6
            this.centerDeck.push(new CardData(10, 0, 0, 8, 0, 0, 'magentaCardFront', 0)); // Lawfish7
            this.centerDeck.push(new CardData(11, 0, 0, 9, 3, 0, 'magentaCardFront', 0)); // Lawfish8
            this.centerDeck.push(new CardData(3, 0, 0, 0, 1, 0, 'magentaCardFront', 0)); // Polifishian1
            this.centerDeck.push(new CardData(3, 0, 1, 0, 1, 0, 'magentaCardFront', 0)); // Polifishian2
            this.centerDeck.push(new CardData(3, 0, 0, 0, 2, 0, 'magentaCardFront', 0)); // Polifishian3
            this.centerDeck.push(new CardData(5, 0, 2, 0, 2, 0, 'magentaCardFront', 0)); // Polifishian4
            this.centerDeck.push(new CardData(7, 0, 3, 0, 3, 0, 'magentaCardFront', 0)); // Polifishian5
            this.centerDeck.push(new CardData(9, 0, 1, 0, 5, 0, 'magentaCardFront', 0)); // Polifishian6
            this.centerDeck.push(new CardData(11, 0, 3, 0, 6, 0, 'magentaCardFront', 0)); // Polifishian7
            this.centerDeck.push(new CardData(13, 0, 6, 0, 6, 0, 'magentaCardFront', 0)); // Polifishian8
            this.centerDeck.push(new CardData(0, 5, 0, 0, 5, 3, 'magentaCardFront', 0)); // Lawsuit - Libel
            this.centerDeck.push(new CardData(0, 10, 0, 0, 10, 5, 'magentaCardFront', 0)); // Lawsuit - RICO 
            this.centerDeck.push(new CardData(0, 1, 0, 0, 1, 1, 'magentaCardFront', 0)); // Lawsuit - Merger
            this.centerDeck.push(new CardData(0, 2, 0, 0, 2, 1, 'magentaCardFront', 0)); // Lawsuit - Slander
            this.centerDeck.push(new CardData(0, 3, 0, 0, 3, 2, 'magentaCardFront', 0)); // Lawsuit - Wrongful Termination
            this.centerDeck.push(new CardData(0, 6, 0, 0, 6, 3, 'magentaCardFront', 0)); // Lawsuit - Medical Malpractice
            this.centerDeck.push(new CardData(0, 4, 0, 0, 4, 2, 'magentaCardFront', 0)); // Lawsuit - Tort
            this.centerDeck.push(new CardData(0, 7, 0, 0, 7, 4, 'magentaCardFront', 0)); // Lawsuit - Drug Recall
            this.centerDeck.push(new CardData(0, 2, 0, 0, 2, 1, 'magentaCardFront', 0)); // Lawsuit - Divorce
            this.centerDeck.push(new CardData(0, 8, 0, 0, 8, 4, 'magentaCardFront', 0)); // Lawsuit - Class Action
            this.centerDeck.push(new CardData(0, 1, 0, 0, 1, 1, 'magentaCardFront', 0)); // Lawsuit - Civil
            this.centerDeck.push(new CardData(0, 9, 0, 0, 9, 5, 'magentaCardFront', 0)); // Lawsuit - EEOC
            this.centerDeck.push(new CardData(0, 8, 0, 0, 8, 4, 'magentaCardFront', 0)); // Lawsuit - SEC Fraud
            this.centerDeck.push(new CardData(0, 9, 0, 0, 9, 5, 'magentaCardFront', 0)); // Lawsuit - Sherman Act
            j++;
        }
        // initial shuffle of center deck
        self.dealer.shuffle(self.centerDeck);

        // initial deal of cards
        // deal cards to player
        self.dealer.dealCards(250, 590, 120, 5, self.playerDeck, self.playerHand);
        self.dealer.dealCards(220, 170, 140, 5, self.centerDeck, self.centerBoard);



        // trade buttons/text:
        // leverage to power
        this.tradeLeverageToPowerText = this.add.text(15, 280, ['3\u23C8 \u21E2 1\u235A']).setFontSize(32).setFontFamily('Balthazar').setColor('#fbbb21').setInteractive();
        this.tradeLeverageToPowerText.on('pointerover', function (pointer) {
            self.tradeLeverageToPowerText.setColor('#ffffff');
        });
        this.tradeLeverageToPowerText.on('pointerout', function (pointer) {
            self.tradeLeverageToPowerText.setColor('#fbbb21');
        });
        this.tradeLeverageToPowerText.on('pointerdown', function (pointer) {
            if (self.leveragePool >= 3) {
                self.leveragePool -= 3;
                self.powerPool += 1;
            }
        });
        // cash to leverage
        this.tradeCashToLeverageText = this.add.text(15, 360, ['3$ \u21E2 1\u23C8']).setFontSize(32).setFontFamily('Balthazar').setColor('#fbbb21').setInteractive();
        this.tradeCashToLeverageText.on('pointerover', function (pointer) {
            self.tradeCashToLeverageText.setColor('#ffffff');
        });
        this.tradeCashToLeverageText.on('pointerout', function (pointer) {
            self.tradeCashToLeverageText.setColor('#fbbb21');
        });
        this.tradeCashToLeverageText.on('pointerdown', function (pointer) {
            if (self.cashPool >= 3) {
                self.cashPool -= 3;
                self.leveragePool += 1;
            }
        });
        // power to cash
        this.tradePowerToCashText = this.add.text(15, 440, ['3\u235A \u21E2 1$']).setFontSize(32).setFontFamily('Balthazar').setColor('#fbbb21').setInteractive();
        this.tradePowerToCashText.on('pointerover', function (pointer) {
            self.tradePowerToCashText.setColor('#ffffff');
        });
        this.tradePowerToCashText.on('pointerout', function (pointer) {
            self.tradePowerToCashText.setColor('#fbbb21');
        });
        this.tradePowerToCashText.on('pointerdown', function (pointer) {
            if (self.powerPool >= 3) {
                self.powerPool -= 3;
                self.cashPool += 1;
            }
        });



        // end turn button/text:
        // creates text
        this.startText = this.add.text(885, 550, [' END \nTURN']).setFontSize(32).setFontFamily('Balthazar').setColor('#fbbb21').setInteractive(); 
        // color change while hovering over text
        this.startText.on('pointerover', function (pointer) {
            self.startText.setColor('#ffffff');
        });
        // color change back to original
        this.startText.on('pointerout', function (pointer) {
            self.startText.setColor('#fbbb21');
        });

        // end turn and start new turn!
        this.startText.on('pointerdown', function (pointer) {
            // end of turn actions:
            // check for power penalties
            for (let i = 0; i < self.centerBoard.length; i++) {
                if (self.centerBoard[i].powerPenalty > 0) {
                    self.powerPool -= self.centerBoard[i].powerPenalty;
                }
            }
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

            // increment turn counter
            self.turnCounter++;


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
            gameObject.setTint(0xfbbb21);
            // top on drag
            self.children.bringToTop(gameObject);
            console.log(gameObject.data.values.cardData);
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
            // lots of game logic will need to happen in here!

            // get card data
            let thisCard = gameObject.data.values.cardData;
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
                self.dealer.moveCard(gameObject.data.values.cardData, self.playerHand, self.playerBoard);
                // console.log(gameObject.data.values.cardData);

                // add car bonuses to player pools
                self.powerPool += thisCard.powerValue;
                self.leveragePool += thisCard.leverageValue;
                self.cashPool += thisCard.cashValue;

            } else if (dropZone === self.playerBoardZone && thisCard.state === 1) { // purchase card from board
                if (self.cashPool >= thisCard.cashCost && self.leveragePool >= thisCard.leverageCost) {
                    self.cashPool -= thisCard.cashCost;
                    self.leveragePool -= thisCard.leverageCost;
                    // handle bonus if Lawsuit card
                    if (thisCard.leverageCost > 0) {
                        self.powerPool += thisCard.powerValue;
                        // draw 1 card when you defeat a lawsuit?
                        if (self.playerDeck.length < 1) {
                            self.dealer.emptyDeckToDeck(self.playerDiscard, self.playerDeck);
                            self.dealer.shuffle(self.playerDeck);
                        }
                        self.dealer.dealCards(250, 590, 120, 1, self.playerDeck, self.playerHand);
                    }
                    //console.log("purchasing a card from state: " + gameObject.data.values.cardData.state);
                    // set data for dropzone
                    dropZone.data.values.cards++;
                    // set card position to dropzone position
                    gameObject.x = dropZone.x - 310 + (dropZone.data.values.cards * 40);
                    gameObject.y = dropZone.y;
                    // disable card dragging
                    gameObject.disableInteractive();
                    // move card from player hand to player board
                    self.dealer.moveCard(gameObject.data.values.cardData, self.centerBoard, self.playerBoard);
                    //console.log(gameObject.data.values.cardData);

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
        this.deckText.setText("DECK: " + this.playerDeck.length);
        this.discardText.setText("DISCARD: " + this.playerDiscard.length);


        this.powerText.setText("\u235A " + this.powerPool);
        this.leverageText.setText("\u23C8 " + this.leveragePool);
        this.cashText.setText("$ " + this.cashPool);
    }
}