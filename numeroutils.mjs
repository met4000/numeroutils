function reverseArr(arr) {
  return arr.map((_, i, a) => a[a.length - i - 1]);
}

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

export class FractionWildCard extends WildCard {
  constructor(p, q) {
    super(`* ${p}/${q}`, n => n * p / q, n => n * q / p);
    this.p = p;
    this.q = q;
  }
}

/**
 * @param {Array<Card>} cardsInPlay 
 * @param {Array<Card>} cardsInHand 
 * @returns {{ finalCard: Card, take: Array<Card> }} the longest 'take'
 */
export function findLongestTake(cardsInPlay, cardsInHand) {
  let availableCards = [...cardsInPlay, ...cardsInHand.filter(card => card.type !== CardType.NUMBER)];
  let handNums = cardsInHand.filter(card => card.type === CardType.NUMBER);

  let longestTakes = handNums.map((card, i) => ({
    finalCard: card,
    take: reverseArr(longestTakeGivenTarget(card.modFunc(0), availableCards, handNums.filter((_, _i) => _i !== i)) ?? [])
  }));
  let longestTake = longestTakes.reduce((r, take) => r.take.length > take.take.length ? r : take);
  return longestTake;
}

/**
 * @param {number} target 
 * @param {Array<Card>} cards 
 * @param {Array<Card>} handNums TODO: currently unused
 * @returns {Array<Card> | undefined} the longest take starting with the target (not included), or undefined if none exist
 */
function longestTakeGivenTarget(target, cards, handNums) {
  if (cards.length === 0) return undefined; // no more cards

  let longestTake = undefined;

  // case for playing no cards:
  if (target === 0) longestTake = [];

  // case for playing cards:
  let leftCards = [], rightCards = [...cards];
  for (let i in cards) {
    let card = rightCards.shift();
    let n = card.invFunc(target);
    
    (() => {
      // * Possible rules; the website doesn't actually specify any of them *
      if (!Number.isInteger(n)) return;   // number must always be an integer
      if (n < 0) return;                  // number must always be positive

      let lTake = longestTakeGivenTarget(n, leftCards.concat(rightCards), handNums);
      if (lTake === undefined) return;
      if (lTake.length === 0 && card.type !== CardType.NUMBER) return;
      
      let take = [card].concat(lTake);
      if (take.length > (longestTake ?? []).length) longestTake = take;
    })();

    leftCards.push(card);
  }

  return longestTake;
}
