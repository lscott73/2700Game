export  default class CardData {
    constructor(cashCost, leverageCost, cashValue, leverageValue, powerValue, sprite, state) {
    this.cashCost = cashCost; // Cash cost for hiring this employee card
    this.leverageCost = leverageCost; // Leverage cost for defeating this lawsuit card
    this.cashValue = cashValue; // Cash bonus for playing this card
    this.leverageValue = leverageValue; // Leverage bonus for playing this card
    this.powerValue = powerValue; // Power bonus for playing this card
    this.cashPenalty; // Cash penalty for ending the turn with this card in the center board
    this.sprite = sprite; // sprite is a string that is the name of the sprite
    this.state = state; // 0 = Center Deck, 1 = Center Board, 2 = Center Discard, 3 = Player Deck, 4 = Player Discard, 5 = Player Hand, 6 = Player Board, 7 = Removed
    }

    getCashCost() {
        return this.cashCost;
    }

    getLeverageCost() {
        return this.leverageCost;
    }

    getCashValue() {
        return this.cashValue;
    }

    getLeverageValue() {
        return this.leverageValue;
    }

    getSprite() {
        return this.sprite;
    }

    getActive() {
        return this.active;
    }

    setCashCost(cashCost) {
        this.cashCost = cashCost;
    }

    setLeverageCost(leverageCost) {
        this.leverageCost = leverageCost;
    }

    setCashValue(cashValue) {
        this.cashValue = cashValue;
    }

    setLeverageValue(leverageValue) {
        this.leverageValue = leverageValue;
    }

    setSprite(sprite) {
        this.sprite = sprite;
    }

    setState(state) {
        this.state = state;
    }
}