import { NumberCard } from "./basetypes.mjs";
import { FractionWildCard } from "./cardtypes/FractionWildCard.mjs";
import { PowerWildCard } from "./cardtypes/PowerWildCard.mjs";
import { RootWildCard } from "./cardtypes/RootWildCard.mjs";
import { SubWildCard } from "./cardtypes/SubWildCard.mjs";
import { findLongestTake } from "./numeroutils.mjs";

export function main(board, hand) {
  dispResults(board, hand, findLongestTake(board, hand));
}

export function dispResults(board, hand, takeObj) {
  // calculate value at each step
  let runningValues = [];
  for (let card of takeObj.take) {
    let oldValue = runningValues[runningValues.length - 1]?.value ?? 0;
    let newValue = card.modFunc(oldValue);
    runningValues.push({ card, value: newValue });
  }

  console.log(`board: ${board}`);
  console.log(`hand: ${hand}`);
  console.log(`\nLongest take found (length ${takeObj.take.length + 1} and ends with ${takeObj.finalCard}):`);

  let pad;
  const valuePlaceholderDisp = "value", cardPlaceholderDisp = "card";
  function genTakeRow(value, disp) {
    let valueDisp = value === undefined ? "".padStart(pad + 2) : `(${value.toString().padStart(pad)})`;
    let cardDisp = disp;
    return `${valueDisp}    ${cardDisp}`;
  }

  // find the 'longest' value (when displayed as a string)
  pad = runningValues.reduce((r, v) => {
    let length = v.value.toString().length;
    return r > length ? r : length;
  }, valuePlaceholderDisp.length);

  console.log(genTakeRow(valuePlaceholderDisp, cardPlaceholderDisp));
  let maxLength = 0;
  for (let { card, value } of runningValues) {
    let row = genTakeRow(value, card);
    if (row.length > maxLength) maxLength = row.length;
    console.log(row);
  }
  console.log("-".repeat(maxLength + 2));
  console.log(genTakeRow(undefined, takeObj.finalCard));
}

main([
  new NumberCard(1),
  new NumberCard(4),
  new NumberCard(6),

  new SubWildCard(3),
  new SubWildCard(5),

  new PowerWildCard(2),
  new RootWildCard(3),

  new FractionWildCard(1, 3),
  new FractionWildCard(2, 5),
  new FractionWildCard(4, 5),
  new FractionWildCard(1, 10),

  new NumberCard(9),
], [
  new NumberCard(3),
  new NumberCard(5),
  new NumberCard(13),
]);
