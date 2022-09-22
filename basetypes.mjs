export const CardType = {
  WILD: "WILD",
  NUMBER: "NUMBER"
};

export class Card {
  /**
   * @param {CardType} type
   * @param {(n: number) => number} modFunc the value modification function
   * @param {(n: number) => number} invFunc the inverse of the value modification function
   */
  constructor(type, modFunc, invFunc) {
    this.type = type;
    this.modFunc = modFunc;
    this.invFunc = invFunc;
  }

  // should be overwritten by subclasses
  getDescription() { return this; }

  toString() {
    return `[${this.getDescription()}]`;
  }
}

export class NumberCard extends Card {
  /**
   * @param {number} value
   */
  constructor(value) {
    super(CardType.NUMBER, n => n + this.value, n => n - this.value);
    this.value = value;
  }

  getDescription() { return this.value; }
}

export class WildCard extends Card {
  /**
   * @param {(n: number) => number} modFunc 
   * @param {(n: number) => number} invFunc 
   */
  constructor(description, modFunc, invFunc) {
    super(CardType.WILD, modFunc, invFunc);
    this.description = description;
  }

  getDescription() { return this.description; }
}
