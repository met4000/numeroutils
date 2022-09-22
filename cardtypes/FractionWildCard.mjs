import { WildCard } from "../basetypes.mjs";

export class FractionWildCard extends WildCard {
  /**
   * @param {number} p numerator
   * @param {number} q denominator
   */
  constructor(p, q) {
    super(`* ${p}/${q}`, n => n * p / q, n => n * q / p);
    this.p = p;
    this.q = q;
  }
}
