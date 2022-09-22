function reverseArr(arr) {
  return arr.map((_, i, a) => a[a.length - i - 1]);
}

export const CardType = {
  WILD: "WILD",
  NUMBER: "NUMBER"
};

export class Card {
  /**
   * @param {(n: number) => number} modFunc the value modification function
   * @param {(n: number) => number} invFunc the inverse of the value modification function
   * @param {CardType} type
   */
  constructor(modFunc, invFunc, type) {
    this.modFunc = modFunc;
    this.invFunc = invFunc;
    this.type = type;
  }
};

export class NumberCard extends Card {
  /**
   * @param {number} value
   */
  constructor(value) {
    super(n => n + this.value, n => n - this.value, CardType.NUMBER);
    this.value = value;
  }
}

/**
 * @param {Array<Card>} cardsInPlay 
 * @param {Array<Card>} cardsInHand 
 * @returns {Array<Card>} the longest 'take'
 */
export function findLongestTake(cardsInPlay, cardsInHand) {
  let availableCards = [...cardsInPlay, ...cardsInHand.filter(card => card.type !== CardType.NUMBER)];
  let handNums = cardsInHand.filter(card => card.type === CardType.NUMBER);

  let longestChains = handNums.map((card, i) => longestChainGivenTarget(card.modFunc(0), availableCards, handNums.filter((_, _i) => _i !== i)));
  let longestChain = longestChains.reduce((runningChain, chain) => runningChain.length > chain.length ? runningChain : chain, []);
  return reverseArr(longestChain);
}

/**
 * @param {number} target 
 * @param {Array<Card>} cards 
 * @param {Array<Card>} handNums TODO: currently unused
 * @returns {Array<Card> | undefined} the longest chain, starting with the target (not included), or undefined if none exist
 */
function longestChainGivenTarget(target, cards, handNums) {
  if (cards.length === 0) return [];

  let longestChain = undefined;

  let leftCards = [], rightCards = [...cards];
  for (let i in cards) {
    let card = rightCards.shift();
    let n = card.invFunc(target);

    // * Possible rules; the website doesn't actually specify any of them *
    // if (!Number.isInteger(n)) continue;   // number must always be an integer
    // if (n < 0) continue;                  // number must always be positive

    let chain = [card].concat(longestChainGivenTarget(n, leftCards.concat(rightCards), handNums));
    leftCards.push(card);
    if (chain === undefined) continue;

    if (chain.length > (longestChain ?? []).length) longestChain = chain;
  }

  return longestChain;
}
