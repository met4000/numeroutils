import { dispResults } from "./display.mjs";
import { findLongestTake } from "./numeroutils.mjs";
import { parse } from "./stringparser.mjs";

let board = parse(`1, 2, 5, 6, ^2, ^3, 3/4, 6, 14, 1/3`);
let hand = parse(`13, 14`);

dispResults(board, hand, findLongestTake(board, hand));
