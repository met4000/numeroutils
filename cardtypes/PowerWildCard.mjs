import { WildCard } from "../basetypes.mjs";

export class PowerWildCard extends WildCard {
  constructor(x) {
    super(`n^${x}`, n => Math.pow(n, x), n => Math.pow(n, 1 / x));
    this.power = x;
  }
}
