export  default class CardData {
    constructor(cashCost, leverageCost, cashValue, leverageValue, sprite, active) {
    this.cashCost = cashCost;
    this.leverageCost = leverageCost;
    this.cashValue = cashValue;
    this.leverageValue = leverageValue;
    this.sprite = sprite;
    this.active = active;
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

    setActive(active) {
        this.active = active;
    }
}