import { WildCard } from "../basetypes.mjs";

export class SubWildCard extends WildCard {
  constructor(x) {
    super(`- ${x}`, n => n - x, n => n + x);
    this.value = x;
  }
}
