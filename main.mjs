import { findLongestTake, NumberCard } from "./numeroutils.mjs";

let board = [
  new NumberCard(1),
  new NumberCard(2),
  new NumberCard(6),
  new NumberCard(9),
];

let hand = [
  new NumberCard(3),
  new NumberCard(5),
];

console.log(findLongestTake(board, hand));
console.log();
