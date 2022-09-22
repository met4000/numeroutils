import { WildCard } from "../basetypes.mjs";

export class RootWildCard extends WildCard {
  /**
   * @param {number} x 
   */
  constructor(x) {
    super(`n^(1/${x})`, n => Math.pow(n, 1 / x), n => Math.pow(n, x));
    this.root = x;
  }
}
