import { WildCard } from "../basetypes.mjs";

export class RootWildCard extends WildCard {
  constructor(x) {
    super(`n^(1/${x})`, n => Math.pow(n, 1 / x), n => Math.pow(n, x));
    this.root = x;
  }
}
