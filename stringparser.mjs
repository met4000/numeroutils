import { Card, NumberCard } from "./basetypes.mjs";
import { FractionWildCard } from "./cardtypes/FractionWildCard.mjs";
import { PowerWildCard } from "./cardtypes/PowerWildCard.mjs";
import { RootWildCard } from "./cardtypes/RootWildCard.mjs";
import { SubWildCard } from "./cardtypes/SubWildCard.mjs";

/**
 * @param {String} str
 * @returns {Array<Card>}
 */
export function parse(str) {
  let words = [...str.replace(/,/g, "").matchAll(/[^\s]+/g)];

  return words.flatMap(word => {
    // number or subtraction
    let nTestResult = /^-?\d+$/.exec(word);
    if (nTestResult) {
      let n = parseInt(nTestResult[0]);
      if (n > 0) {
        return [new NumberCard(n)];
      } else {
        return [new SubWildCard(-n)];
      }
    }

    // power
    let powTestResult = /^\^(\d+)$/.exec(word);
    if (powTestResult) {
      let n = powTestResult[1];
      return [new PowerWildCard(n)];
    }

    // root
    let rootTestResult = /^\^1\/(\d+)$/.exec(word);
    if (rootTestResult) {
      let n = rootTestResult[1];
      return [new RootWildCard(n)];
    }

    // fraction (or div, or mult)
    let fracTestResult = /^(\d*)\/(\d*)$/.exec(word);
    if (fracTestResult) {
      let p = fracTestResult[1] || 1, q = fracTestResult[2] || 1;
      return [new FractionWildCard(p, q)];
    }

    // mult
    let multTestResult = /^x(\d+)$/.exec(word);
    if (multTestResult) {
      let n = multTestResult[1];
      return [new FractionWildCard(n, 1)];
    }

    console.error(word, "unrecognised pattern");
    return [];
  });
}
