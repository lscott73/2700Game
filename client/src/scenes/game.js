import CyanCardBack from '../assets/CyanCardBack.png';
import CyanCardFront from '../assets/CyanCardFront.png';
import MagentaCardBack from '../assets/MagentaCardBack.png';
import MagentaCardFront from '../assets/MagentaCardFront.png';

import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';
import Dealer from '../helpers/dealer.js';
import io from 'socket.io-client';



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

        this.isPlayerA = false;

        this.opponentCards = [];



        // create new instance of zone class
        this.zone = new Zone(this);
        // create new dropzone and outline for dropzone
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.dealer = new Dealer(this);


        // create socket connection
        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
            console.log('Connected!');
        });
        // helps determine if player is player A based on socket emit from server.js
        this.socket.on('isPlayerA', function () {
            self.isPlayerA = true;
        });

        this.socket.on('dealCards', function () {
            console.log('deal cards 2');
            self.dealer.dealCards();
            self.dealText.disableInteractive();
        });

        this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
            if (isPlayerA !== self.isPlayerA) {
                let sprite = gameObject.textureKey;
                // delete card from opponent hand
                self.opponentCards.shift().destroy();
                self.dropZone.data.values.cards++;
                let card = new Card(self);
                card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), self.dropZone.y, sprite).disableInteractive();
            }
        });

        // creates text
        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive(); 

        // on click for deal cards
        this.dealText.on('pointerdown', function (pointer) {
            console.log('deal cards 1');
            self.socket.emit('dealCards');
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
            // tint back to normal on drop --- not working, added it to this.input.on('drop') instead
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

            // reset tint here i guess?
            gameObject.setTint();

            // disable card dragging
            gameObject.disableInteractive();

            self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
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